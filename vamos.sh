docker build -t 192.168.1.55:5000/srapoc . 

docker push 192.168.1.55:5000/srapoc

kubectl -n fabricio rollout restart deployment srapoc
