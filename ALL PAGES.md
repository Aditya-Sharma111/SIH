# Smart Crop: Current Pages

This file lists the current Next.js App Router pages present in the project. The route paths below are based on the `app/**/page.tsx` files currently in the repository.

## Main Farmer Pages

| Route | Page | Source |
| --- | --- | --- |
| `/` | Farmer dashboard (home page) | [app/page.tsx](app/page.tsx) |
| `/dashboard` | Farmer dashboard alias | [app/dashboard/page.tsx](app/dashboard/page.tsx) |
| `/authentication` | Sign in, registration, Google authentication, and password recovery | [app/authentication/page.tsx](app/authentication/page.tsx) |
| `/onboarding` | Farmer, agriculture officer, and bank/insurance profile setup | [app/onboarding/page.tsx](app/onboarding/page.tsx) |
| `/farmer-profile` | Farmer profile and farm intelligence | [app/farmer-profile/page.tsx](app/farmer-profile/page.tsx) |
| `/farmerprofile` | Farmer profile alias | [app/farmerprofile/page.tsx](app/farmerprofile/page.tsx) |
| `/crop-monitoring` | Crop monitoring, field health, soil, and weather data | [app/crop-monitoring/page.tsx](app/crop-monitoring/page.tsx) |
| `/crop-monitoring-page` | Crop monitoring alias | [app/crop-monitoring-page/page.tsx](app/crop-monitoring-page/page.tsx) |
| `/crop-details` | Crop details and sowing guide | [app/crop-details/page.tsx](app/crop-details/page.tsx) |
| `/full-crop-guide` | Full crop cultivation guide | [app/full-crop-guide/page.tsx](app/full-crop-guide/page.tsx) |
| `/alternative-crop` | Alternative crop recommendations | [app/alternative-crop/page.tsx](app/alternative-crop/page.tsx) |
| `/market` | Market page | [app/market/page.tsx](app/market/page.tsx) |
| `/marketpage` | Market page alias | [app/marketpage/page.tsx](app/marketpage/page.tsx) |
| `/insurance` | Smart Crop insurance and PMFBY portal | [app/insurance/page.tsx](app/insurance/page.tsx) |
| `/notifications` | Notifications list | [app/notifications/page.tsx](app/notifications/page.tsx) |
| `/notifications/[id]` | Notification details for a notification ID | [app/notifications/[id]/page.tsx](app/notifications/[id]/page.tsx) |
| `/notification-page` | Notifications list alias | [app/notification-page/page.tsx](app/notification-page/page.tsx) |

## Government Schemes and Equipment

| Route | Page | Source |
| --- | --- | --- |
| `/schemes` | Government schemes page | [app/schemes/page.tsx](app/schemes/page.tsx) |
| `/government-schemes` | Government equipment schemes page alias | [app/government-schemes/page.tsx](app/government-schemes/page.tsx) |
| `/government-equipment-schemes` | Government equipment schemes page | [app/government-equipment-schemes/page.tsx](app/government-equipment-schemes/page.tsx) |
| `/equipment-schemes` | Government equipment schemes page alias | [app/equipment-schemes/page.tsx](app/equipment-schemes/page.tsx) |
| `/equipment` | Equipment page | [app/equipment/page.tsx](app/equipment/page.tsx) |
| `/equipment-dashboard` | Equipment dashboard | [app/equipment-dashboard/page.tsx](app/equipment-dashboard/page.tsx) |

## Agriculture Officer Pages

| Route | Page | Source |
| --- | --- | --- |
| `/officer-dashboard` | Agriculture officer dashboard | [app/officer-dashboard/page.tsx](app/officer-dashboard/page.tsx) |
| `/agriculture-officer-dashboard` | Agriculture officer dashboard alias | [app/agriculture-officer-dashboard/page.tsx](app/agriculture-officer-dashboard/page.tsx) |
| `/admin/dashboard` | Agriculture officer dashboard admin alias | [app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx) |

## Bank and Insurance Partner Portal

| Route | Page | Source |
| --- | --- | --- |
| `/bank-portal` | Bank partner dashboard | [app/bank-portal/page.tsx](app/bank-portal/page.tsx) |
| `/bankportal` | Bank partner dashboard alias | [app/bankportal/page.tsx](app/bankportal/page.tsx) |
| `/bank-portal/dashboard` | Bank partner dashboard | [app/bank-portal/dashboard/page.tsx](app/bank-portal/dashboard/page.tsx) |
| `/bank/dashboard` | Bank dashboard alias | [app/bank/dashboard/page.tsx](app/bank/dashboard/page.tsx) |
| `/bank-portal/register` | Bank registration and profile | [app/bank-portal/register/page.tsx](app/bank-portal/register/page.tsx) |
| `/bank-portal/facilities` | Manage financial facilities | [app/bank-portal/facilities/page.tsx](app/bank-portal/facilities/page.tsx) |
| `/bank-portal/facilities/manage` | Manage financial facilities alias | [app/bank-portal/facilities/manage/page.tsx](app/bank-portal/facilities/manage/page.tsx) |
| `/bank-portal/facilities/add` | Add or edit a financial facility | [app/bank-portal/facilities/add/page.tsx](app/bank-portal/facilities/add/page.tsx) |
| `/financial-support` | Agricultural financial facilities | [app/financial-support/page.tsx](app/financial-support/page.tsx) |
| `/financial-support/list` | Financial facilities list | [app/financial-support/list/page.tsx](app/financial-support/list/page.tsx) |
| `/financial-support/detail` | Financial facility details | [app/financial-support/detail/page.tsx](app/financial-support/detail/page.tsx) |
| `/financial-support/acknowledgement` | Financial support acknowledgement | [app/financial-support/acknowledgement/page.tsx](app/financial-support/acknowledgement/page.tsx) |

## Notes

- Total route files currently present: **38**.
- Alias routes intentionally render an existing page so that both URL variants remain available.
- `/notifications/[id]` is a dynamic route and requires a notification ID, for example `/notifications/123`.
- `/financial-support/detail` may require query parameters for the selected facility.
- The authentication entry point is `/authentication`.
