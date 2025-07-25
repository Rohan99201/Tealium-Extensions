# 📘 Tealium Extension Setup Guide

This repository contains all JavaScript extensions configured in **Tealium** for various school websites, based on each site's structure and supported events.

---

<details>
<summary>🧩 Extension Structure</summary>

### Event Phases

- **Phase 1** – Core Events  
  _(e.g., Page Views, Click-to-Call, Form Submissions)_

- **Phase 2** – Advanced/Custom Events  
  _(e.g., Scroll Depth, Video Plays, CTA Interactions)_

</details>

---

<details>
<summary>🔧 Steps to Create Extensions</summary>

### Steps in School Profile (e.g., `tamiu`)

1. **Login** to Tealium and go to the specific profile.
2. Navigate to `Extensions` → `+ Add Extension`.
3. Choose **JavaScript Code** or **Advanced JavaScript Code**.
4. Inspect the website for a relevant class/ID/selector.
5. Write the logic in JavaScript.
6. Set **Scope** to `DOM Ready`.
7. Save the extension in the **Dev** environment.

> 🧪 Test using **Analytics Debugger** or **Omnibug** in Dev.

</details>

---

<details>
<summary>🌐 Global Profile Configuration</summary>

### In `deltak/global-ap-ga4` Profile

1. Recreate the same extensions.
2. Go to the **AP-Global-GA4** tag.
3. Open **Mapped Variables**.
4. Map all relevant parameters used in the events.

</details>

---

<details>
<summary>🏫 Linking School to Global Dev Profile</summary>

### Steps:

1. Go to **Manage Profiles**.
2. Select the school you're working on.
3. Link it to the **Dev version** of the `global-ap-ga4` profile.
4. For all extensions:
   - Set **Publish Location** to:  
     ✅ `Prod`  
     ✅ `QA`
5. Publish the **profile only in Dev** for testing.

</details>

---

<details>
<summary>🚀 Final Publishing & Testing</summary>

### After Validation in Dev

1. Navigate to the **school profile**.
2. Ensure all tags/extensions from `global-ap-ga4` are visible.
3. Reconfirm **Publish Locations**:  
   ✅ `Dev`, ✅ `QA`, ✅ `Prod`
4. Publish the profile to **Dev**, **QA**, and **Prod**.
5. Open the website in **Prod** and test using **Omnibug**:
   - GA4 tag is firing
   - Event name and parameters are correct

</details>

---

<details> <summary>✅ Tools Used</summary>

- Tealium iQ

- Omnibug

- Analytics Debugger

- Chrome DevTools

</details>

---

<details> <summary>📌 Notes</summary>

- Implement only the events supported by each website.

- Always validate in Dev before publishing to Prod.

- Maintain consistent naming for variables and selectors.

</details> ```

