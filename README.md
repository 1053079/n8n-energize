# N8N - PROJECT

![A picture of the N8N slogan. ](https://blog.n8n.io/content/images/2022/06/og-image-website.png)

## Table of Contents
* **Wat is N8N?**
* **Installatie**
* **Functionaliteiten van Cat Node**
* **Handleiding voor het gebruik van Cat Node**
* **Tests**
* **Hoe werkt de logica in onze Workflow?**
* **Beperkingen**

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
# **Handleiding voor het gebruik van Cat Node**
#### **Maak een N8N Workflow aan**
Als je n8n start --tunnel hebt geactiveerd hebt zal je een localhost hebben met een port.       
Maak een N8N Workflow aan door de knop 'Add Workflow' te klikken.


![Shows a picture of how to add workflows in N8N.](images/Handleiding/add_workflow.png)

#### **Zet Telegram Trigger neer dat reageert op elke Message**
Eenmaal binnen je Workflow zie je meteen een + knop met als tekst 'Add first step...'.       
Druk erop en in de zoekbalk typ je 'Telegram'.       
Je hebt dan keuze uit 9 Triggers. Voor deze voorbeeld kiezen we 'On Message'

![Shows the Telegram Trigger in N8N.](images/Handleiding/TriggerNode.png)

#### **Zoek Cat Node op en voer Credentials in!**
Klik op de plus knopje naast de Telegram Trigger en zoek op 'Cat'.  
Klik vervolgens op de potlood icoontje naast de 'Cat account' om de credentials in te voeren.

![A picture of the Cat Node in N8N.](images/Handleiding/CatNode.png)

#### **Vul de API Key in om toegang te krijgen tot de Cat API.**                 
``` 
live_rTcHLiRJhVBwWzluR6il6QLmjQ0640BMOzomWz5mb3EQ7NQFJYxyxtIvcdUB5RMG
```

![Shows the API Key being used to verify the credentials to access the Cat API.](images/Handleiding/APIkey.png)

#### *Maak een keuze bij de Resource tussen Random Cat Picture of Random Cat GIFS*
De Cat NODE heeft 2 keuzes bij de Resources.
* *Random Cat Picture*
* *Random Cat GIFS*      

Bij allebei laat je de Operation op standaard 'Get'.        
Display Cat Qualities kan je een keuze maken tussen 'Yes' of 'No'. De Display Cat Qualities is alleen toepasbaar bij *Random Cat Picture!*

![Shows the options you can choose from Resources tab from the Cat node.](images/Handleiding/ResourceChoice.png)
#### *Bij Yes*
Bij 'Yes' krijg je niet alleen een foto maar ook een hele beschrijving en dingen zoals naam, verwachte leeftijd en oorsprong.

![Shows the output data when Yes is selected for Display Cat Qualities in the Cat Node.](images/Handleiding/YesQualities.png)
#### *Bij No*
Bij 'No' krijg je alleen een leuke kattenfoto.      
De Breeds array is empty maar daar hoef je niet op te letten.. het is alleen meer werk als je JSON moet oproepen met [0] omdat het een Json Object is.

![Shows the output data when No is selected for Display Cat Qualities in the Cat Node.](images/Handleiding/NoQualities.png)
#### *Bij Random Cat Gifs* 
Random Cat GIFS heeft alleen een standaard operation van 'Get'.     
Random Cat GIFS geeft de user de mogelijkheid om katten GIFS te sturen in plaats van alleen foto's. 

![Shows a picture of the Cat Node in action.](images/Handleiding/GIFS.png)

#### Druk op de plus knop naast de Cat Node en verbind het met Telegram
Er is keuze uit 23 Actions.. voor deze voorbeeld gebruiken we 'Send a Photo Message'

![Photo showing the 23 actions of a Telegram Node.](/images/Handleiding/TelegramActions.png)

Voor deze stap zie je dat je de parameters nodig hebt van Telegram's Chat ID en de url van de Cat Node.

![Photo of the Telegram Node parameters in N8N.](/images/Handleiding/NeedParameters.png)

Om de Telegram Chat ID te krijgen moet je zelf via Telegram een account aanmaken en via BotFather een Bot Access Token aanvragen (https://core.telegram.org/api). Die kan je dan verbinden met de Telegram Credentials API in N8N. Nodig je Bot uit in je Group Chat en typ in de chat. Zorg wel ervoor dat je eerst Listening For event hebt geklikt bij de Telegram Trigger Node en ook dat de Workflow op Active staat (die staat rechtsbovenaan in de Workflow).

![Telegram output after listening to an event in N8N.](/images/Handleiding/HandleidingOutput.png)

Als de Listening Event succesvol is gegaan heb je de Input data ervan en kan je die doorgeven aan de laatste Telegram Node. Via de input links kan je de informatie doorgeven. Je kan op de informatie klikken en als het ware overdragen naar de parameters.
Let wel op dat bij Cat Node dat je een [0] achter de Json zet (Zie voorbeeld hieronder).

![Inserting data into the Telegram Node by connecting our input data to it.](/images/Handleiding/TelegramParameters.png)

![Executing the Workflow in N8N is successful.](/images/Handleiding/HandleidingWorkflow.png)

![Succesfully sent a cat picture via N8N to Telegram.](/images/Handleiding/HandleidingTelegramCat.png)
# **Tests**
## Importeer de Workflow.Json
Download de Cat.Workflow.Json van de Github hier en ga vervolgens terug naar je Workflow.
Helemaal rechtsbovenaan zie je drie stippeltjes. Klik erop en kies 'Import from File'

![Shows a picture of how to import a file into N8N.](images/Tests/Importeer.png)

## Test Workflow
Als het goed is ziet het er zo uit.

![Shows a picture of the Workflow in N8N with Cat node functionalities.](images/Tests/CatWorkFlow.png)

Druk op de grijze balk rechtsbovenaan om de workflow te activeren. Dit moeten we doen anders kunnen we geen data halen uit Telegram.
Normaliter moet je ook eerst je eigen Telegram account hebben met een BOT access token en die invullen als credentials voor Telegram. Zo kan die namelijk jou en jouw chat ID vinden.
In onze voorbeeld heb ik er al 1.
Als er gedrukt wordt op 'Listen for an event' en ik een message intypt in de Chat Group ontvangt de Telegram Trigger gegevens over mij zoals naam, id en in welke chat id ik zit. Dit hebben we nodig.
Dit gepinde informatie staat trouwens in de Cat_Workflow.Json..

![The output is shown on the right after listening to a Telegram Event in N8N.](images/Tests/TelegramTriggerOutput.png)

### Tijd om de Cat Node te testen
## Cat Gifs
Klik op de Cat Node en je kan zien dat je kan kiezen tussen 2 Resources. Cat Gifs en Cat Pictures. We kiezen als voorbeeld eerst 'Cat Gifs' en execute de Cat Node.

![The output data is shown on the right after executing the Cat Node in N8N.](images/Tests/CatGifTest/CatWithGIFOutput.png)

In de output kan je zien dat er in de url een gif uitkomt. We gaan eventjes terug naar de Workflow zelf en dan drukken we op 'Execute Workflow'.

![Showing a picture of the mouse hovering the 'Execute Workflow' button in N8N](images/Tests/CatGifTest/CatWithGIFExecute.png)

![The Workflow with Cat GIFS is successfully executed.](images/Tests/CatGifTest/CatWithGIFTest.png)

![GIF of a cat in Telegram sent by a Telegram Bot](images/Tests/CatGifTest/CatWithGIF.png)

Top het werkt! Het reageert standaard op alle berichten dus hoeft niet alleen op 'sendcatpicture' of iets.. maar de optie is er wel in de n8n workflow om dat te filteren gebaseerd op de tekst die gegeven wordt in Telegram. Dat kan je bereiken met IF en SWITCH nodes.

## Cat Pictures 
We gaan nu kijken naar de 'Cat Pictures'. We veranderen de Resource naar 'Random Cat Picture' en kiezen bij Display Cat Qualities de keuze 'No' we willen alleen de foto!

![The output of the Cat Node when Display Cat Qualities is selected as no.](images/Tests/CatPictureTest/CatWithPictureOutput.png)

![The Workflow with Cat Pictures is successfully executed.](images/Tests/CatPictureTest/CatWithPictureTest.png)

![Photo of a cat in Telegram sent by a Telegram Bot](images/Tests/CatPictureTest/CatWithPicture.png)

Toppie het gaat de juiste route op! 

## Cat Pictures met Description

![The output of the Cat Node when Display Cat Qualities is selected as yes.](images/Tests/CatDescriptionTest/CatWithDescriptionOutput.png)

![The Workflow with Cat Pictures with Description is successfully executed.](images/Tests/CatDescriptionTest/CatWithDescriptionTest.png)

![Photo of a cat with description sent by a Telegram Bot](/images/Tests/CatDescriptionTest/CatWithDescription.png)

Hier heb je dan een kattenfoto met naam, beschrijving, leeftijdverwachting en oorsprong!

# Hoe werkt de logica in onze Workflow?
In de Cat API krijgen we 'Empty Arrays' terug bij de foto's en gifs. Maar bij de foto's met descriptie is die *niet* leeg. We zetten dus een if condition dat als de array niet empty is dat het naar de bovenste route gaat.

![The Logic behind the workflow in N8N](images/Logica/flowwchart.png)

![Photo of an IF node in N8N with it checking whether or not the JSON array is empty or not.](images/Logica/BreedsArray.png)

Als de Array empty is gaat het naar een nieuwe IF node waar we een Regex match neerzetten om te kijken of het een gif is of niet.
Als het wel GIF in de url bevat gaat het naar de middenste route. Anders gaat het naar de onderste route.

![Photo of an IF node in N8N with Regex Match to check whether gif is present in the url](images/Logica/RegexMatchGif.png)

# **Beperkingen van de Node**
1. **De Additional Fields doet niks.**     
Ik heb geen idee wat ik met de Additional Fields moet doen.
2. **Om toegang te krijgen tot de output van Cat moet je per se [0] achter de Json zetten. Je kunt dus niet simpelweg vanuit de input van de vorige node halen. Nou ja kan wel maar dan moet je wel elke keer [0] achter de Json zetten.**    
Ja dit is irritant en ik denk dat het komt omdat de Breeds array niet altijd iets bevat. Dus je hebt Breeds_ID = 0 of 1 in de query parameter van The Cat Api. De workaround is dat we gewoon elke keer [0] achter de json zet.. het is wat het is.
3. **Docs gaat nergens naartoe.**         
Ik ga eerlijk zijn ik heb geen idee waar ik de docs zou aanpassen.. en we hosten dit lokaal en niet op het internet dus hier komen we niet aan toe.
4. **Je kan geen bepaalde soort katten zoeken. Het is allemaal random.**           
Het zou veel werk zijn om uit te zoeken hoeveel ras katten er zijn in de Cat Api database. Overigens is het ras afgekort tot 4 letters en niet gewoon 'Siamese' als voorbeeld.
5. **Er is geen optie om de lengte en hoogte van de foto's of GIFs te zetten.**           
IS er niet.. maar misschien wel mogelijk om de users een input field te geven waar ze de max lengte en hoogte kunnen aangeven. Dat is mijn insteek maar of het mogelijk is dat zien we wel...

