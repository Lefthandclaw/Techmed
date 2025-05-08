#TechMed - Terveyssovellus

TechMed-projektin dokumentaatio.

---

##Käyttöliittymän kuvakaappaukset

###Kirjautumissivu


![Kirjautumissivu](https://github.com/user-attachments/assets/368252db-4b96-411a-a108-fe296ed264b4)

---

###Koti-sivu
![Koti-sivu](https://github.com/user-attachments/assets/674ed4ec-d19c-41fe-bfd5-4e65dd4f1e0c)

---

### 🏋️‍♂️ Harjoitukset
Tässä näkymässä käyttäjä näkee omat harjoituksensa. Lista voi sisältää tietoa ajankohdasta, kestosta ja tyypistä.
![Harjoitukset](./docs/kuvat/workouts.png)

---

### ❤️ HRV-sivu

#### 🧾 HRV Yhteenveto
Yhteenveto-osio näyttää keskeiset HRV-mittarit kuten stressitason, RMSSD:n ja muita terveysindikaattoreita.
![HRV Yhteenveto](./docs/kuvat/hrv-summary.png)

#### 📋 HRV Taulukko
HRV-taulukko sisältää yksityiskohtaiset mittaustiedot, kuten päivämäärän, mittausarvot ja mahdolliset kommentit.
![HRV Taulukko](./docs/kuvat/hrv-table.png)

#### 📈 HRV Kaavio
Visualisointi HRV-arvojen kehityksestä ajan myötä. Kaavio auttaa käyttäjää seuraamaan terveydentilansa muutoksia.
![HRV Kaavio](./docs/kuvat/hrv-chart.png)

---

## 🌐 Julkaistu sovellus (front-end)

🔗 [https://techmed.northeurope.cloudapp.azure.com](https://techmed.northeurope.cloudapp.azure.com)

---

## 🔌 Back-end / API

🔗 [https://techmed.northeurope.cloudapp.azure.com/api](https://techmed.northeurope.cloudapp.azure.com/api)

---

## 📚 API-dokumentaatio (apidoc)

🔗 [https://techmed.northeurope.cloudapp.azure.com/apidoc](https://techmed.northeurope.cloudapp.azure.com/apidoc)

---

## 🎨 Rautalankamallit

🔗 [Figma-mallit](https://www.figma.com/...)  
Tai kuvat:  
📁 `docs/wireframes/`

---

## 🗄️ Tietokantarakenne

📁 `docs/database/structure.png`

![Tietokanta](./docs/database/structure.png)

Tietokanta perustuu käyttäjiin, sessioihin ja HRV-mittauksiin. Käytössä on esimerkiksi MongoDB / PostgreSQL / SQLite.

---

## ⚙️ Toteutetut toiminnallisuudet

- 🔐 Käyttäjän kirjautuminen (JWT)
- 👤 Admin-kirjautuminen
- 📊 Kubios-integraatio käyttäjädatan hakemiseksi
- 🔍 Tietojen haku ja listaus
- 🧪 Testaus Node.js-ympäristössä
- 📄 API-dokumentaatio (`apidoc`)
- 🌍 Julkaisu Azure-ympäristössä

---

## 🐞 Tiedossa olevat bugit / rajoitteet

- Token vanhenee ilman automaattista uudistamista
- Admin- ja käyttäjäpolut eivät ole täysin eriytetyt
- Responsiivisuus pienillä näytöillä vaatii parannusta

---

## 📚 Referenssit ja käytetyt työkalut

- Frontend: React / Tailwind CSS
- Backend: Express / Node.js
- API: Kubios HRV API
- Dokumentaatio: [apidoc](https://apidocjs.com/)
- Hosting: Azure Cloud VM
- Graafiset komponentit: Chart.js / Material UI
- Tutoriaalit:
  - [Fullstack Open](https://fullstackopen.com/)
  - MDN Web Docs
  - Kubios API -dokumentaatio

---

## 🧪 Ohjelmistotestaus

📁 `tests/`

- Sisältää manuaalitestit ja automatisoidut testit
- Testiraportit: `tests/reports/`

---

## ✅ Opettajien pääsy

Kaikki yllä mainittu materiaali on julkaistu tässä GitHub-repossa tai palvelussa, jonka osoite on annettu.  
Jos tarvitaan käyttöoikeuksia, ne on myönnetty opettajille (esim. GitHub Collaborators, Figma-linkin "Anyone with the link can view").

---

## 🗂 Rakenne

