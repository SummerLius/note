
## 网络相关指令


- net-tools工具包
    - arp
    - hostname
    - ifconfig
    - ipmaddr
    - iptunnel
    - mii-tool
    - nameif
    - netstat
    - plipconfig
    - rarp
    - route
    - slattach
- iproute2工具包
    - ss
    - tc
    - ip
    - rtmon
    - rtacct
    - ifcfg

相关工具：
tcpdump
nmap
netstat
wireshark
1）ping:检测网络连接的正常与否,主要是测试延时、抖动、丢包率。
           但是很多服务器为了防止攻击，一般会关闭对ping的响应。所以ping一般作为测试连通性使用。ping命令后，会接收到对方发送的回馈信息，其中记录着对方的IP地址和TTL。TTL是该字段指定IP包被路由器丢弃之前允许通过的最大网段数量。TTL是IPv4包头的一个8 bit字段。例如IP包在服务器中发送前设置的TTL是64，你使用ping命令后，得到服务器反馈的信息，其中的TTL为56，说明途中一共经过了8道路由器的转发，每经过一个路由，TTL减1。

2）traceroute：raceroute 跟踪数据包到达网络主机所经过的路由工具
   traceroute hostname
3）pathping：是一个路由跟踪工具，它将 ping 和 tracert 命令的功能与这两个工具所不提供的其他信息结合起来，综合了二者的功能
   pathping www.baidu.com
4）mtr：以结合ping nslookup tracert 来判断网络的相关特性
5) nslookup:用于解析域名，一般用来检测本机的DNS设置是否配置正确。


