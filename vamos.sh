docker build -t www.planetaguru.com.ar/srapoc . 

docker push www.planetaguru.com.ar/srapoc

kubectl -n fabricio rollout restart deployment srapoc
