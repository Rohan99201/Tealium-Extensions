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

<details>
<summary>📁 Directory Structure</summary>

```plaintext
/extensions
  /school-name
    - click-to-call.js
    - form-submit.js
    - scroll-depth.js
    - README.md




# 📘 Tealium Extension Setup Guide

This repository contains all JavaScript extensions configured in **Tealium** for various school websites, based on the structure and events supported by each site.

---

## 🧩 Extension Structure

All events are divided into two implementation phases:

- **Phase 1** – Core events (e.g., Scroll, Form Interaction Events)
- **Phase 2** – Advanced/Custom events (e.g., Accordians Clicks, BreadCrumb, Video Plays, CTA Interactions)

---

## 🔧 Steps to Create Extensions

1. **Login** to Tealium and navigate to the target profile (e.g., `tamiu`).
2. Go to `Extensions` → Click `+ Add Extension`.
3. Choose **JavaScript Code** or **Advanced JavaScript Code**.
4. Write the JS logic based on the website's structure (use class, ID, or selectors).
5. Set **Scope** to: `DOM Ready`.
6. Save the extension in the **Dev** environment.

> 🔍 Use `Analytics Debugger` or `Omnibug` to test tag firing in the browser console.

---

## 🌐 Global Profile Setup

Once Dev testing is successful:

1. Navigate to `deltak/global-ap-ga4` profile.
2. Recreate all required event extensions.
3. Open the `AP-Global-GA4` tag.
4. Go to **Mapped Variables** and map all parameters used in the events.

---

## 🏫 School Profile Mapping

1. Go to **Manage Profiles**.
2. Select the current school you're working on.
3. Link it to the **Dev** version of the `global-ap-ga4` profile.
4. In each extension, update **Publish Location** to:  
   ✅ `Prod`  
   ✅ `QA`  
   🚫 Do not publish to these yet.

5. Publish the profile to the **Dev** environment only.

---

## 🚀 Final Publishing & Testing

1. Navigate to the **school profile**.
2. Confirm all global tags and extensions are visible.
3. Update extension **Publish Locations** (if not already done):  
   ✅ `Dev`, `QA`, `Prod`

4. Publish the school profile to:  
   ✅ `Dev`  
   ✅ `QA`  
   ✅ `Prod`

5. Use **Omnibug** in the **Prod** environment to validate:
   - GA4 tag firing
   - Event names
   - Parameters passed

---

## ✅ Tools Used

- Tealium iQ
- Omnibug (Browser Plugin)
- Analytics Debugger
- Chrome DevTools

---

## 📌 Notes

- Not all events are applicable to every school; implement based on structure.
- Always validate changes in **Dev** before publishing to **Prod**.
