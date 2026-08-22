# Cardia — Heart Disease Risk Assessment & Clinical Decision Support Platform

An integrated full-stack platform for cardiovascular risk assessment, built as a graduation project for the Systems and Computer Engineering Department, Faculty of Engineering (Boys), Al-Azhar University.

Cardia automates the estimation of coronary heart disease risk from **13 standard clinical parameters**, combining a secure, role-aware REST API with a machine learning inference layer and a modern React frontend.

## 🌐 Live Demo

[demo.webm](https://github.com/user-attachments/assets/f10d1b4a-cd95-4d23-a270-8c47d78431dc)


- **Platform (Live):** https://hdps-frontend.vercel.app/
- **Frontend Hosting (Vercel)**
- **Backend, ML Model and Database Hosting (Railway)** Free Trail ends :(
- **Wireframes (Miro Board):** https://miro.com/app/live-embed/uXjVGIuIq08=/?embedMode=view_only_without_ui&moveToViewport=-7978%2C-3604%2C15199%2C6877&embedId=751690836475

## 🩺 Overview

Cardiovascular disease remains the leading cause of mortality worldwide. Cardia serves as a **decision-support tool** — not a diagnostic replacement — that helps triage patients by synthesizing 13 clinical parameters into a probabilistic risk estimate, then connects that estimate directly to a specialist booking workflow.

## 🏗️ Architecture

Cardia follows a **decoupled, three-tier architecture**:

- **Frontend:** React + TypeScript SPA, using `react-hook-form` and `Zod` for schema validation
- **Backend:** Spring Boot + Spring Security, exposing a role-segregated REST API
- **ML Layer:** Machine learning inference component consuming validated clinical payloads and returning probabilistic predictions
- **Database:** MySQL relational persistence layer

```
React/TS SPA  →  Spring Security Filter Chain  →  REST Controllers
                                                        ↓
                                          Service Layer (business logic)
                                                        ↓
                        ┌───────────────────────────────────────────┐
                        │                                           │
              Spring Data JPA Repository Layer          ML Inference Component
                        ↓
                MySQL Relational Database
```

## 📁 Project Structure

### Backend (`HDPS_backend`)
<img width="550" height="941" alt="Screenshot 2026-07-06 121344" src="https://github.com/user-attachments/assets/10efd1a4-b4df-442e-a088-324ae7ed8ccf" />

### Frontend (`HDPS_frontend`)

<img width="771" height="942" alt="Screenshot 2026-07-06 121815" src="https://github.com/user-attachments/assets/2539057e-30d7-4a3d-bbf5-34d513aa5e21" />

## 🗄️ Database Schema
<img width="812" height="1487" alt="preview" src="https://github.com/user-attachments/assets/0251eb1f-6d40-45d9-ad64-8fd59e2656fc" />

The persistence layer is built around a `person` base table (holding shared `role` and `address` references), specialized via joined-table inheritance into `patient`, `doctor`, and `admin`. Clinical predictions are stored in `medical_test` (linked to `patient`), while `appointment` links `patient` and `doctor` records and optionally produces a `prescription`.

Key tables: `person`, `role`, `address`, `patient`, `doctor`, `admin`, `medical_test`, `appointment`, `prescription`.

## 🧬 Clinical Parameters

The prediction model consumes 13 standard clinical parameters:

| Parameter | Description |
|---|---|
| `age` | Patient age (years) |
| `sex` | Biological sex (0 = female, 1 = male) |
| `cp` | Chest pain type |
| `trestbps` | Resting blood pressure (mmHg) |
| `chol` | Serum cholesterol (mg/dl) |
| `fbs` | Fasting blood sugar > 120 mg/dl |
| `restecg` | Resting ECG results |
| `thalch` | Maximum heart rate achieved |
| `exang` | Exercise-induced angina |
| `oldpeak` | ST depression induced by exercise |
| `slope` | Slope of the peak exercise ST segment |
| `ca` | Number of major vessels colored by fluoroscopy |
| `thal` | Thalassemia status |

## 👥 User Roles

- **Patient** — submits medical data for prediction, views history, books appointments
- **Doctor** — reviews patient medical test history, issues prescriptions
- **Admin** — manages users, doctors, medical tests, and appointments system-wide

## 📡 API Reference

### Authentication — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Authenticate and establish a session |
| GET | `/api/auth/logout` | Authenticated | Invalidate the current session |

### Patient — `/api/patient`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/patient/register` | Public | Register a new patient account |
| GET | `/api/patient/me` | PATIENT | Get authenticated patient's profile |
| PUT | `/api/patient/update` | PATIENT | Update patient profile |
| GET | `/api/patient/me/appointments` | PATIENT | List patient's appointments |
| GET | `/api/patient/me/medical-tests` | PATIENT | List submitted medical test history |
| GET | `/api/patient/me/prescriptions` | PATIENT | List issued prescriptions |
| POST | `/api/patient/predict` | PATIENT | Submit clinical data, get a risk prediction |
| GET | `/api/patient/doctors` | PATIENT | List available doctors |
| POST | `/api/patient/bookappointment/{doctorId}` | PATIENT | Book an appointment |
| PATCH | `/api/patient/cancelappointment/{appointmentId}` | PATIENT | Cancel an appointment |

### Doctor — `/api/doctor`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/doctor/appointments` | DOCTOR | List doctor's appointments |
| GET | `/api/doctor/appointment/{appointmentId}/medicaltests` | DOCTOR | Get patient's medical test history for an appointment |
| GET | `/api/doctor/appointment/{appointmentId}/prescription` | DOCTOR | Initialize a prescription for an appointment |
| POST | `/api/doctor/save-prescription` | DOCTOR | Save a completed prescription |

### Admin — `/api/admin`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/admin/users` | ADMIN | List all patients and doctors |
| GET | `/api/admin/users/{id}` | ADMIN | Get a single user by ID |
| DELETE | `/api/admin/users/{id}` | ADMIN | Delete a user account |
| POST | `/api/admin/doctors` | ADMIN | Register a new doctor account |
| GET | `/api/admin/medical-tests` | ADMIN | List all medical test records |
| GET | `/api/admin/medicaltests/{testId}/patient` | ADMIN | Resolve the patient of a medical test |
| DELETE | `/api/admin/medical-test/{id}` | ADMIN | Delete a medical test record |
| GET | `/api/admin/appointments` | ADMIN | List all appointments |
| DELETE | `/api/admin/appointment/{appointmentId}` | ADMIN | Delete an appointment |

## 🔒 Security

- **Session-based authentication** via Spring Security, backed by `HttpSessionSecurityContextRepository`
- **BCrypt** password hashing (no plaintext credentials, ever)
- **Role-based authorization** with fail-closed access control (`PATIENT`, `DOCTOR`, `ADMIN`)
- **CORS** configured with an explicit origin whitelist (no wildcards) and `allowCredentials(true)`

## 📊 Machine Learning Model Performance
<img width="1600" height="777" alt="WhatsApp Image 2026-06-28 at 7 41 57 PM" src="https://github.com/user-attachments/assets/76092fef-2603-468a-ae31-f4e3048dde7e" />

The prediction model is a **Random Forest Classifier**, tuned via cross-validated hyperparameter search and optimized for recall to minimize missed positive diagnoses.

**Best Parameters:**

```
n_estimators: 100
min_samples_split: 5
min_samples_leaf: 2
max_depth: 10
class_weight: balanced
```

**Final Results:**

| Metric | Score |
|---|---|
| CV Avg Accuracy | 82.20% |
| Test Accuracy | 84.78% |
| Recall | 91.18% |
| ROC AUC | 0.92 |

**Classification Report:**

| Class | Precision | Recall | F1-Score | Support |
|---|---|---|---|---|
| 0 (No Disease) | 0.88 | 0.77 | 0.82 | 82 |
| 1 (Disease) | 0.83 | 0.91 | 0.87 | 102 |
| **Accuracy** | | | **0.85** | 184 |
| **Macro Avg** | 0.85 | 0.84 | 0.84 | 184 |
| **Weighted Avg** | 0.85 | 0.85 | 0.85 | 184 |

**Confusion Matrix:**

|  | Predicted 0 | Predicted 1 |
|---|---|---|
| **Actual 0** | 63 | 19 |
| **Actual 1** | 9 | 93 |

**Top Feature Importances:** `cp` > `chol` > `thalch` > `age` > `oldpeak` > `exang` > `trestbps` > `sex` > `thal` > `restecg` > `ca` > `slope` > `fbs`

The model was tuned to favor recall (91.18%) over raw accuracy, minimizing false negatives — a deliberate design choice given the clinical cost of missing a true positive case is higher than that of a false alarm.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, react-hook-form, Zod |
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| ML Inference | Integrated prediction service |
| Deployment | Vercel (frontend), Railway (backend) |

## 🚀 Getting Started

### Prerequisites

- JDK 17+
- Node.js 18+
- A running MySQL instance

### Backend

```bash
cd backend
# configure src/main/resources/application.properties
# with your MySQL datasource URL, username, and password
mvn clean install
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## ⚠️ Disclaimer

Cardia is a clinical **decision-support tool** and does not provide a definitive medical diagnosis. It does not replace the examination, history-taking, or judgment of a licensed physician. All predictions are paired with a recommended-cardiologist workflow to encourage professional consultation.

## 👨‍💻 Contributors

*   **Ahmed Hadaka Abdelmottaleb**: Team Lead, Define System Architecture, Backend Development, Integration of Machine Learning Model, Backend and Frontend to deliver a full working software, Cloud Deployment, Task Distribution.
*   **Ahmed Sajed El-Sayed** : Frontend Development.
*   **Ragab Hussein Abdelhamid**: Database Development.
*   **Mohamed Omar Sayed** [github](https://github.com/Mohamed19633): Frontend Development (React/TypeScript, Zod Validation, UI/UX), Technical Documentation & Reporting.
*   **Mahmoud Abdelrahim Mahmoud** [github](https://github.com/7oda2002): Machine Learning Model Development (Python, Scikit-learn, Inference Integration).
*   
**Supervised by:** Dr. Ali Halawa
**Institution:** Al-Azhar University — Faculty of Engineering (Boys), Systems and Computer Engineering
