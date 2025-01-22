import re
from bs4 import BeautifulSoup
import requests

def scrape(collection,L):
    url = f"https://abedtahan.com/collections/{collection}"
    def scrape_page(page_url):
        page = requests.get(page_url)
        soup = BeautifulSoup(page.text, "lxml")
        everything = soup.find("div", class_="product-grid-container")

        if not everything:
            return [], None

        urls = everything.find_all("a", class_="full-unstyled-link")
        links = ["https://abedtahan.com" + z.get("href") for z in urls]

        pagination = soup.find("link", rel="next")
        next_page = pagination["href"] if pagination else None

        if next_page and not next_page.startswith("http"):
            next_page = "https://abedtahan.com" + next_page

        return links, next_page

    all_links = []
    current_page = url

    while current_page:
        print(f"Scraping page: {current_page}")
        links, next_page = scrape_page(current_page)
        all_links.extend(links)
        current_page = next_page

    for item_link in all_links:
        currDic = {}
        page2 = requests.get(item_link)
        soup2 = BeautifulSoup(page2.text, "lxml")

        everything2 = soup2.find("section", class_="shopify-section section")
        prices = everything2.find("div", class_="price__sale")
        if prices is not None:
            currDic["name"] = everything2.find("h1").text.strip()
            price_text = prices.find("span", class_="price-item price-item--sale price-item--last").text.strip()
            currDic["price"] = int(re.sub(r"[^\d]", "", price_text))
            currDic["seller"] = "Abed Tahan"
            scripts = soup2.find_all("script")
            cpn_value = None
            brand_value = None
            for script in scripts:
                if 'ccs_cc_args.push([\'cpn\'' in script.text:
                    match = re.search(r"ccs_cc_args\.push\(\['cpn',\s*'([^']+)'\]\)", script.text)
                    if match:
                        cpn_value = match.group(1)
                
                if 'var _learnq' in script.text:
                    brand_match = re.search(r'Brand:\s*[\'"]([^\'"]+)[\'"]', script.text)
                    if brand_match:
                        brand_value = brand_match.group(1)
                    
            currDic["id"] = cpn_value if cpn_value else "Not available"
            currDic["subcategory"] = brand_value if brand_value else "Not available"
            
            meta_image = soup2.find("meta", property="og:image")
            currDic["imageURL"] = meta_image.get("content") if meta_image else "Not available"
            
            canonical_link = soup2.find("link", rel="canonical")
            currDic["ProductURL"] = canonical_link.get("href") if canonical_link else "Not available"
            if collection!='wearable-tech':
                currDic["category"]= collection
            else:
                 currDic["category"]= "Smart Watches"
            L.append(currDic)
    


categories = ['Smartphones','Tablets','wearable-tech','Laptops']
result=[]
for c in categories:
    scrape(c,result)

print(len(result))
print(result)
