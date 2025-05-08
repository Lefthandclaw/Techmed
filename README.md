# TechMed - Terveyssovellus

TechMed-projektin dokumentaatio.

---

## Käyttöliittymän kuvakaappaukset

### Kirjautumissivu


![Kirjautumissivu](https://github.com/user-attachments/assets/368252db-4b96-411a-a108-fe296ed264b4)

---

### Koti-sivu
![Koti-sivu](https://github.com/user-attachments/assets/674ed4ec-d19c-41fe-bfd5-4e65dd4f1e0c)

---

### Harjoitukset-sivu
![Harjoitukset](https://github.com/user-attachments/assets/1fb0f0cd-a45f-4539-9cfa-42b20737ef22)

---

### HRV-sivu

#### (1/3)
![HRV1](https://github.com/user-attachments/assets/eb08861c-8e6e-40d3-a717-55d6d8cdeff4)

#### (2/3)
![HRV2](https://github.com/user-attachments/assets/213c6189-2eee-4bae-b49c-e22dc1c3a488)

#### (3/3)
![HRV3](https://github.com/user-attachments/assets/22184915-3f66-41cb-a131-7f44915541ec)

---

## Julkaistu sovellus (front-end)

[https://techmed.northeurope.cloudapp.azure.com](https://techmed.northeurope.cloudapp.azure.com)

---

## Back-end

[https://techmed.northeurope.cloudapp.azure.com/backend.html](https://techmed.northeurope.cloudapp.azure.com/backend.html)

---

## API-dokumentaatio (apidoc)

[https://techmed.northeurope.cloudapp.azure.com/apidoc](https://techmed.northeurope.cloudapp.azure.com/apidoc)

---

## Rautalankamallit

[Figma-mallit](https://github.com/Lefthandclaw/Techmed/tree/main/k%C3%A4ytt%C3%B6liittym%C3%A4%20suunnitelma%20kuvat/figma%20k%C3%A4ytt%C3%B6liittym%C3%A4) 

[Piirretyt mallit](https://github.com/Lefthandclaw/Techmed/tree/main/k%C3%A4ytt%C3%B6liittym%C3%A4%20suunnitelma%20kuvat/piirretty%20k%C3%A4ytt%C3%B6liittym%C3%A4)

---

## Tietokantarakenne

![Tietokanta](https://github.com/user-attachments/assets/15e6bdaf-0974-4c86-a942-91ad88e14964)

---

## ⚙️ Toteutetut toiminnallisuudet

- Käyttäjän kirjautuminen

- JWT-tunnisteen tallennus ja tarkastus

- Uloskirjautuminen

- Kotisivu kirjautumisen jälkeen

- Kubios API -integraatio: käyttäjätiedot

- Kubios API -integraatio: HRV-data

- HRV-yhteenveto (RMSSD, stressi, valmius)

- HRV-arvojen taulukko

- HRV-taulukko suodatus (aikaväli)

- HRV-arvojen kaavio

- HRV-datan suodatus (aikaväli)

- HRV-tason luokittelu ja tilan arviointi

- Päivän HRV-tiedon tallennus localStorageen

- Kalenterinäkymä HRV-datalla (FullCalendar)
  
- HRV-arvojen värikoodaus kalenterissa:

- HRV-tasoon perustuva harjoitusvalinta

- Automaattinen harjoituksen valinta päivän HRV:n perusteella

- Harjoituksen ääni-integraatio (audio/mp3)

- Responsiivinen käyttöliittymä

- Popup-ilmoitukset virheistä ja tiedoista

- Animoitu popup-ilmoitus, joka katoaa automaattisesti (fadeInOut-animaatio)

---

## Tiedossa olevat bugit / rajoitteet

- HRV-kaavio ei aina skaalaudu oikein mobiililaitteilla
- Kalenterin kieli on osittain englanniksi, vaikka oletuskieleksi on määritetty suomi

---

## Referenssit ja käytetyt työkalut

### Teknologiat
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Visualisointi**: [Chart.js](https://www.chartjs.org/), [FullCalendar](https://fullcalendar.io/)
- **Tyylit**: Google Fonts (Outfit), responsiivinen design, CSS Grid & Flexbox
- **Backend**: Node.js, Express.js
- **API-dokumentaatio**: [apidoc](https://apidocjs.com/)
- **Tietoturva**: JWT-autentikointi (JSON Web Tokens)
- **Kolmannen osapuolen rajapinta**: [Kubios HRV API](https://www.kubios.com/hrv-api/)

### Kehitystyökalut
- Visual Studio Code
- Git & GitHub
- Azure Virtual Machine (Linux Ubuntu)
- npm (pakettienhallinta)

### Dokumentointi & suunnittelu
- Figma (rautalankamallit)
- README.md (GitHub-dokumentaatio)
  
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

