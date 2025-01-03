from bs4 import BeautifulSoup
import requests
search= input("enter_item: ")
search=search.split()
searchz = "+".join(search)
url = "https://abedtahan.com/search?q=" + searchz +"&options%5Bprefix%5D=last"
page = requests.get(url)
soup = BeautifulSoup(page.text, "lxml")
everything = soup.find("div", class_ = "product-grid-container")
urls=[]
for something in everything:
    urls.append(something.find("a", class_ ="full-unstyled-link"))
urls = everything.find_all("a", class_ ="full-unstyled-link")

links=[]
for z in urls:
    relative_link = z.get("href")
    link = "https://abedtahan.com" + relative_link
    links.append(link)



L=[]
for item_link in links:
    currDic= {}
    page2 = requests.get(item_link)
    soup2 = BeautifulSoup(page2.text, "lxml") 
    everything2 = soup2.find("section", class_ = "shopify-section section")
    prices = everything2.find("div", class_="price__sale")
    if prices != None:
        currDic["Name"] = everything2.find("h1").text.strip()
        currDic["Final price"]= prices.find("span", class_ = "price-item price-item--sale price-item--last").text.strip()
        currDic["Original Price"] = prices.find("small", class_ ="price-item price-item--regular").text.strip()
        L.append(currDic)
        print(currDic)


