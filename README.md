#  script javascript para consumo da API de dados climaticos da [hgbrasil](https://hgbrasil.com/)

### DISCLAMER 
- O intuito desse projeto é meramente educacional, visando desenvolver minhas habilidades, e auxiliar nos estudos de quem possa interessar.
- Antes de utilizar esse script verifique as politicas de uso dos recursos disponibilizados pela [hgbrasil](https://hgbrasil.com/)

#### Pré-requisitos:

- Criar conta no [hgbrasil](https://hgbrasil.com/)
- Gerar chave de acesso no [hgbrasil](https://hgbrasil.com/)**
- Conhecimento basico em HTML e javascript

**Existem dois tipos de chave, para uso exposto e uso interno, para esse projeto considerei a chave do tipo exposta, para que possa ser disponibilizada no browser tornando os testes mais simples, sem necessidade de executar nada do lado do servidor, para maiores informações verificar a documentação da API no [hgbrasil](https://hgbrasil.com/)

### Como utilizar

- Faça o download do arquivo clima.js e salve na pasta do seu projeto
- Importe o script para dentro do seu arquivo html ex ```<script src="clima.js"></script>```. Não esqueça de considerar toda a estrutura de pastas na hora de informar o caminho do arquivo ex ```./Minha Pasta/clima.js```

#### Configurações iniciais

- Para que o script funcione são necessárias algumas configurações simples que estão comentadas no código

 - 1º -> Informar a chave de acesso que foi gerada no [hgbrasil](https://hgbrasil.com/) em ```const key = "";``` ex ```const key = "123456abc";```

 - 2º -> Existem 3 formas para pegar a localização do usuário, woeid, cidade, e IP.

  - WOEID -> Informar em ```const woeidCode = ;``` ex ```const woeidCode = 459678;``` para consultar pelo codigo da cidade, para encontrar o código correspondente a cidade usar [hgbrasil tools](https://console.hgbrasil.com/documentation/weather/tools), essa é a opção mais recomendada, pois evita problemas com grafia na hora de escrever o nome da cidade, ou com uso de proxy/vpn no caso do IP do usuário


  - CIDADE -> Informar em ```const city = "";``` ex ```const city = "salvador";``` para consultar por cidade

  - IP -> Para pegar a geolocaliação pelo IP do usuáio, não é necessario informar nada apenas setar em ```option``` a opção correspondente

 - 3º -> Informar a opção do item 2 acima que devera ser considerado para pegar a localização do usuário em ```const option = ;``` ex ```const option = 1;```

  - Sendo: 
    - 0 => para utilizar WOEID
    - 1 => para o nome da CIDADE
    - 2 => para pegar o IP

#### Como incorporar as informações recebidas da API

 - Os dados foram associados ao seletor class, sendo assim você pode usar qualquer elemento/TAG HTML que desejar, bastando informar a classe correspondente ao dado que quer incorporar, com exceção do uso das imagens, que nesse caso deve ser utilizado a TAG HTML IMG.

 Ex.

 ```<div class="temp"></div>``` OU 
 ```<span class="temp"></span>``` OU 
 ```<p class="temp"></p>``` OU 
 ```<h2 class="temp"></h2>```
vai retornar o mesmo resultado, o valor da temperatura do dia

Para utilizar as imagens correspondente ao clima, basta utilizar a tag IMG com a classe correspondente, ex ```<img class="condition_slug">```


#### Dados disponiveis

|Dia|Nome|Classe|Tipo|Descrição|Exemplo|
|---|----|------|----|-----|-------|
|hoje|Temperatura|temp|Texto|temperatura atual em ºC| 23°|
|hoje|Data|date|Texto|data da consulta, em fuso horário do local| 10/08/2020|
|hoje|Hora|time|Texto|hora da consulta, em fuso horário do local| 15:45|
|hoje|Descrição|description|Texto|descrição da condição de tempo atual | Tempo nublado|
|hoje|Momento atual|currently|Texto|retorna se está de dia ou de noite | Noite|
|hoje|Cidade com UF|city|Texto|ome da cidade seguido por UF| São Paulo, SP|
|hoje|Cidade sem UF|city_name|Texto|nome da cidade| Salvador|
|hoje|Umidade|humidity|Texto|umidade atual em percentual| 58%|
|hoje|Nebulosidade|cloudiness|Texto|nebulosidade em percentual, de 0 a 100| 60%|
|hoje|Chuva|rain|Texto|volume de chuva em mm na última hora| 3.48%
|hoje|Velocidade do vendo|wind_speedy|Texto|velocidade do vento em km/h|6.31 km/h
|hoje|Direção do vento|wind_direction|Texto|direção do vento em grau| 102°
|hoje|Ponto cardeal|wind_cardinal|Texto|direção do vento em ponto cardeal| SE
|hoje|Nascer do Sol|sunrise|Texto|nascer do Sol em horário local da cidade| 05:57 am
|hoje|Pôr do Sol |sunset|Texto|pôr do Sol em horário local da cidade| 05:21 pm
|hoje|Fase da Lua|moon_phase|Imagem|Imagem da fase da Lua veja|<img src="./img/waxing_crescent.png" width="20px">
|hoje|Condição de tempo|condition_slug|Imagem|Imagem da condição de tempo atual|<img src="./img/cloudly_day.svg" width="20px">
|hoje|Fuso horário|timezone|Texto|fuso horário da cidade|UTC -03:00

É possivel pegar dados futuros de D+N até nove dias, ou seja, D1 são os dados de amanha, D2 são os dados de depois de amanha, e assim por diante
* Na classe substituir o day+n por day0, day1, day2 ... day9 de acordo com o dia que quer retornar os dados ex ```class=day1_date```  **day0 = hoje

|Dia|Nome|Classe|Tipo|Descrição|Exemplo|
|---|----|------|----|-----|-------|
|D+N|Data|day+n_date|Texto|data da previsão dd/mm|10/07
|D+N|Dia da semana|day+n_weekday|Texto|dia da semana abreviado|Qua
|D+N|Nebulosidade|day+n_cloudiness|Texto| nebulosidade em percentual, de 0 a 100|74%
|D+N|Volume de chuva|day+n_rain |Texto| volume de chuva esperado|3.48%
|D+N|Probabilidade de chuva|day+n_rain_probability |Texto| probabilidade de chuva em percentual, de 0 a 100|100%
|D+N|Velocidade do vento|day+n_wind_speedy |Texto| velocidade do vento em km/h|5.86 km/h
|D+N|Temperatura máxima|day+n_max |Texto| temperatura máxima em ºC|24°
|D+N|Temperatura mínima|day+n_min |Texto|temperatura mínima em ºC|26°
|D+N|Descrição|day+n_description |Texto| descrição da previsão|Chuvas esparsas
|D+N|Condição de tempo|day+n_condition |Imagem| Imagem da condição veja|<img src="./img/cloudly_day.svg" width="20px">

