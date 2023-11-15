# Baremetal 장비별 온도 Tag
| Tag | Value | Vendor | Description | 비고 |
|-----|-------|--------|-------------|------|
| 1 | Inlet Temp | 24 °C | Dell | |
| 2 | Inlet_Temp | 26 °C | Inspur | Air inlet temperature <br> from: Inspur Server NF5468A5 White Paper <br> Sensor Location: Right mounting ear <br> from: Inspur Server NF5468A5 White Paper |
| 3 | MB_CPU_IN_TEMP | 28 °C | GigaByte | Motherboard CPU Inlet Temperature |
| 4 | TEMP_MB_INLET | 26 °C | DGX | Motherboard Inlet Temperature |
| 5 | CPU1_Temp | 37 °C | Dell | CPU 1 Temperature <br> Tag 규칙(Telegraf, Salt 변경 예정): cpu1_temp, cpu2_temp |
| 6 | CPU0_Temp | 55 °C | Inspur | CPUn core temperature <br> from: Inspur Server NF5468A5 White Paper <br> Tag 규칙: CPU0_Temp, CPU1_Temp |
| 7 | CPU_DIMMG0_TEMP | 33 °C | GigaByte | CPU DIMM Group 0 Temperature <br> Tag 규칙: CPU_DIMMG0_TEMP, CPU_DIMMG1_TEMP |
| 8 | TEMP_CPU0 | 50 °C | DGX | CPU 0 Temperature <br> Tag 규칙: TEMP_CPU0, TEMP_CPU1 |
| 9 | Exhaust Temp | 32 °C | Dell | |
| 10 | Outlet_Temp | 37 °C | Inspur | Air outlet temperature <br> from: Inspur Server NF5468A5 White Paper <br> Sensor Location: BMC card <br> from: Inspur Server NF5468A5 White Paper |
| 11 | MB_CPU_OUT_TEMP | 30 °C | GigaByte | Motherboard CPU Outlet Temperature |
| 12 | TEMP_MB_OUTLET | 46 °C | DGX | Motherboard Outlet Temperature |
| 13 | FRONT_PANEL_TEMP | 23 °C | GigaByte | Front Panel Temperature |
| 14 | TEMP_AMBIENT | 23 °C |

# Baremetal 장비별 전력 Tag
| Tag | Value | Vendor | Description | 비고 |
|-----|-------|--------|-------------|------|
| 1 | Pwr Consumption | 456 W | Dell | 장비 소비 전력량 |
| 2 | Total_Power | 720 W | Inspur | Total power of the server <br> The server power consumption components include PSUs, memories, drives, GPUs, CPUs, fans, PCIe cards, etc <br> from: Inspur Server NF5468A5 White Paper |
| 3 | PSU1_PWR_IN | 140 W | GigaByte | Power Supply Unit 1 Input <br> ※ Topology 그래프에서 2개 값 모두 화면 출력 |
| 4 | PSU2_PWR_IN | 4 W | GigaByte | Power Supply Unit 2 Input |
| 5 | PWR_SYSTEM | 1638 W | DGX | System Power |