# 提示
from memory cache
from dish cache

内存中找，找不到，硬盘中找，找不到，网络请求

200 from memory cache  
浏览器关闭后，数据将不存在（资源被释放掉了），再次打开相同的页面时，不会出现from memory cache

200 from dish cache
不访问服务器，已经在之前的某个时间加载过该资源，直接从硬盘中读取缓存，关闭浏览器后，数据依然存在，此资源不会随着该页面的关闭而释放掉下次打开仍然会是from disk cache。

200 大小(如3.4k)
访问服务器，size显示为实际资源的大小

304 Not Modified
访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据。这种在请求头中有两个请求参数：If-Modified-Since 和 If-None-Match
