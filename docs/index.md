# Power Electronics and Control Training

Welcome to the course.

## Course Topics

- Electronics Fundamentals
- PWM
- RC and RLC Circuits
- MATLAB Modelling
- Simulink Control Design
- Simscape Electrical Modelling
- Control Systems
- Power Electronics
- Inverters
- System Identification
- Grid-Following VSC
- Grid-Forming VSC

## Recommended Hardware

### Controllers

- Arduino Uno
- ESP32 DevKit V1

### Test Equipment

- DSO Nano V3
- OWON HDS272S

### Software

- MATLAB
- Simulink
- Simscape Electrical

## Start Here

1. Introduction
2. Arduino Uno Familiarisation
3. DSO Nano V3 Familiarisation

## Learning Path

The main learning path remains hardware-first, with simulation companion pages added where they provide clear value.

See also:

- Simulation_Track_Overview.md

```mermaid
flowchart TD

A[Introduction]
--> B[Arduino Familiarisation]

B --> C[Oscilloscope Familiarisation]

C --> D[ESP32 Familiarisation]

D --> E[PWM Fundamentals]

E --> F[RC Circuits]

F --> G[RLC Circuits]

G --> H[MOSFET Fundamentals]

H --> I[AC-DC Rectifiers]

I --> J[DC-AC Inverters]

J --> K[DC Chopper Converters]

K --> L[Buck Converter]

L --> M[Boost Converter]

M --> N[PWM Motor Control]

N --> O[System Identification]

O --> P[P Controller]

P --> Q[PI Controller]

Q --> R[PID Controller]

R --> S[Closed-Loop Buck]

S --> T[Controller Design]

T --> U[Grid Following VSC]

U --> V[Grid Forming VSC]
```
