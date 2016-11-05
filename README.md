# MA_2016
## 顔認証時のユーザの追加APIをたたくcurl
$ curl -X POST -d '{"Human":{"ID":"123","Gender":"Male","Age":"21"}}' http://192.168.3.70:5000/api/createUser  
  
## ユーザのネタを登録するときのcurl
$ curl -X POST -d '{"ID":"999","Story":"眠れない"}' http://192.168.3.70:5000/api/RegisterStory  
  
## DBに登録したネタを取り出す
$ curl -X POST -d '{"ID":"999"}' http://192.168.3.70:5000/api/getUserStory  
  
