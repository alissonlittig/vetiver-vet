from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in((390,844),(1366,768)):
        pg=b.new_page(viewport={'width':w,'height':h}); pg.goto('http://localhost:8766/vetiver-vet/') 
        pg.wait_for_timeout(4000); print(w,pg.inner_text('#agendar')[:80].replace('\n','|'))
