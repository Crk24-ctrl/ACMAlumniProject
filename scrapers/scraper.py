from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import re

# Configure Selenium options
chrome_options = Options()
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Automatically install ChromeDriver
service = Service(ChromeDriverManager().install())

def scrape_category(category_url, category_name, subcategory_name, product_list):
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(category_url)
    
    # Wait for page to load products
    time.sleep(3)  # Initial delay to allow the page to load completely
    
    all_links = []
    page_number = 1

    while True:
        print(f"Scraping page {page_number}: {driver.current_url}")
        
        # Extract product links from the current page
        soup = BeautifulSoup(driver.page_source, "lxml")
        products = soup.find_all("div", class_="item")
        print(f"Found {len(products)} products on this page.")
        
        for product in products:
            link_tag = product.find("a", class_="product-image") or product.find("a", href=True)
            if link_tag:
                all_links.append(link_tag.get("href"))
        
        # Scroll down to trigger the loading of more products
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # Give the page time to load more products
        
        # Check if enough products are found
        if len(all_links) >= 98:  # You can adjust the target product count if needed
            print("Sufficient products found, ending scrape.")
            break
        
        page_number += 1
    
    # Process each product link
    for product_link in all_links:
        product_data = {}
        driver.get(product_link)
        time.sleep(3)  # Allow page to load
        
        # Extract product details
        soup = BeautifulSoup(driver.page_source, "lxml")
        name_tag = soup.find("div", class_="product-name")
        product_data["name"] = name_tag.text.strip() if name_tag else "Not available"
        
        price_tag = soup.find("div", class_="price-box-min")
        if price_tag:
            price = price_tag.find("span", class_="price")
            product_data["price"] = float(re.sub(r"[^\d.]", "", price.text.strip())) if price else "Not available"
        
        original_price_tag = soup.find("p", class_="old-price")
        if original_price_tag:
            original_price_text = original_price_tag.find("span", class_="price").text.strip()
            product_data["original_price"] = float(re.sub(r"[^\d.]", "", original_price_text))
        else:
            product_data["original_price"] = None
        
        if product_data["original_price"] and product_data["price"]:
            product_data["discount_percentage"] = round(
                ((product_data["original_price"] - product_data["price"]) / product_data["original_price"]) * 100, 2
            )
        else:
            product_data["discount_percentage"] = None
        
        image_tag = soup.find("img", id="product-collection-image")
        product_data["image_url"] = image_tag["src"] if image_tag else "Not available"
        
        product_data["product_url"] = product_link
        product_data["category"] = category_name
        product_data["subcategory"] = subcategory_name

        product_list.append(product_data)

    driver.quit()

categories = [
    {
        "url": "https://www.hicart.com/electronics",
        "name": "Electronics",
        "subcategories": ["Computers", "Large Appliances"]
    },
    {
        "url": "https://www.hicart.com/mobile-tablets",
        "name": "Mobiles and Tablets",
        "subcategories": ["Mobiles", "Tablets"]
    }
]

result = []
for category in categories:
    for subcategory in category["subcategories"]:
        subcategory_url = f"{category['url']}/{subcategory.lower().replace(' ', '-')}"
        scrape_category(subcategory_url, category["name"], subcategory, result)

print(f"Total products scraped: {len(result)}")
print(result)
