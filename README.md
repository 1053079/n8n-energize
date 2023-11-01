# N8N - PROJECT

![Alt text](https://blog.n8n.io/content/images/2022/06/og-image-website.png)

## Table of Contents
* **Wat is N8N?**
* **Installatie**
* **Functionaliteiten van Cat Node**
* **Tests**
* **Handleiding voor het gebruik van Cat Node**

### **Wat is N8N?**
N8n is een automatisering tool waar jij als gebruiker workflows kan maken om het werkproces te automatiseren. Voor onze werkplaats 5 gaan we een custom Node bouwen waarmee wij iets kunnen toevoegen van waarde voor onze client, CloudShift.
### **Installatie**
Om gebruik te maken van N8N moet je het eerst installeren in jouw systeem via CMD. 
```
n8n install n8n -g
```
Om n8n lokaal te hosten op jouw client gebruik je de syntax
```
n8n start --tunnel
```
**Let op!** Je moet gebruik maken van --tunnel om gebruik te maken van HTTP Requests binnen N8N.
### **Functionaliteiten van Cat Node**
#### **Functies van de Node**
```
1. Stuur foto's van katten
2. Stuur GIF van katten
3. Stuur foto's van katten met beschrijving (met verwachte leeftijd en oorsprong)
```
#### **Beperkingen van de Node**
```
1. De Additional Fields doet niks.
2. Om toegang te krijgen tot de output van Cat moet je per se [0] achter de Json zetten. Je kunt dus niet simpelweg vanuit de input van de vorige node halen. Nou ja kan wel maar dan moet je wel elke keer [0] achter de Json zetten
3. Docs gaat nergens naartoe.
4. Je kan geen bepaalde soort katten zoeken. Het is allemaal random.
5. Er is geen optie om de lengte en hoogte van de foto's of GIFs te zetten.
```
### **Tests**
To be added
# **Handleiding voor het gebruik van Cat Node**
#### **Maak een N8N Workflow aan**
Als je n8n start --tunnel hebt geactiveerd hebt zal je een localhost hebben met een port.       
Maak een N8N Workflow aan door de knop 'Add Workflow' te klikken.


![Alt text](images/add_workflow.png)

#### **Zet Telegram Trigger neer dat reageert op elke Message**

![Alt text](images/TriggerNode.png)

#### **Zoek Cat Node op en voer Credentials in!**
Zoek de Cat Node op en verbind het met de Telegram Trigger.
Klik op de potlood icoontje naast de 'Cat account' om de credentials in te voeren.

![Alt text](images/CatNode.png)

#### **Vul de API Key in om toegang te krijgen tot de Cat API.**                 
``` 
live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG
```

![Alt text](images/APIkey.png)

#### 