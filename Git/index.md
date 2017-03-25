
## 基础理论

### 配置

git config  
git config --system    
git config --global    
git config --local     

依次对应的目录为：  
- Linux：/etc/gitconfig  
- Linux：~/.gitconfig`  
- Linux：.git/config`  
- Windows: D:/WorkSoftwares/Git/mingw64/etc/gitconfig  
- Windows：C:/Users/admin/.gitconfig  
- Windows：.git/config

#### core.autocrlf  

git config --global core.autocrlf input    
git config --global core.autocrlf true    
git config --global core.autocrlf false    

input：适合Linux或Mac系统配置，签出文件时不进行crlf转换，提交文件会将crlf修正为lf   
true ：适合Windows系统配置，签出文件自动将lf转换为crlf，提交文件时自动就将crlf转换为lf  
false：任何时候都不转换






### Git仓库文件状态

![file_status](../Resources/images/file_status.png)
![file_status](https://github.com/SummerLius/note/blob/master/Resources/images/file_status.png)



### Git Command

获取一个仓库
git init
git clone <repo-url>
