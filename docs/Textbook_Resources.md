# Textbook Reading Path

This page connects the practical labs with three reference books. The locators below use the editions identified by ISBN where possible. Chapter numbering can differ between printings, so use the chapter title and section keywords as the reliable locator when your copy is organised differently.

## Books

- **Ogata, _Modern Control Engineering_** — ISBN `9789332550162`
- **Yazdani and Iravani, _Voltage-Sourced Converters in Power Systems_** — ISBN `9780470521564`
- **Erickson and Maksimovic, _Fundamentals of Power Electronics_** — ISBN `9783030438791`

## How to Use the Path

Read the listed chapter or section before the corresponding lab, derive or predict the expected result, complete the simulation, and then compare the measurement with the ideal model. Record the assumptions that explain any difference. The section keywords are also useful for locating the material in an e-book search.

## Practical Prerequisites

Complete Labs 00A–00C before the theory sequence:

- **00A:** Arduino and ESP32 programming, GPIO, ADC, PWM, and serial communication
- **00B:** Oscilloscope operation, probing, triggering, and waveform measurement
- **00C:** ESP32 setup, logic levels, ADC limitations, PWM, and WiFi-related constraints

These are equipment and implementation prerequisites rather than assigned textbook reading.

## Erickson and Maksimovic: Power Electronics

Use the power-electronics topics in this sequence:

| Labs | Reading focus |
|---|---|
| 01 | Ch. 2, **Basic Concepts**: switching waveforms, PWM, duty ratio, and average values |
| 02–03 | Ch. 2, **Basic Concepts**, and Ch. 3, **Steady-State Converter Analysis**: capacitor/inductor energy storage, transients, resonance, and damping |
| 04 | Ch. 2, **Basic Concepts**: power semiconductor switches, gate drive, conduction loss, and switching loss; search **device losses** and **gate drive** |
| 05 | Ch. 3, **Steady-State Converter Analysis**: chopper operation, switching intervals, and average conversion |
| 06 | Ch. 3, **Steady-State Converter Analysis**, sections on **buck converters**, **volt-second balance**, **CCM**, **DCM**, and **ripple** |
| 07 | Ch. 3, **Steady-State Converter Analysis**, sections on **boost converters**, **inductor energy transfer**, **CCM**, **DCM**, and **duty-ratio limits** |
| 08 | Ch. 2, **Basic Concepts**, and the sections on **converter applications** and **power supplies/motor drives** |
| 09 | Ch. 3, **Steady-State Converter Analysis**, sections on **diode rectifiers** and **capacitive filtering** |
| 10 | Ch. 3, **Steady-State Converter Analysis**, sections on **inverters**, **bridge converters**, **modulation**, **harmonics**, and **filters** |

The labs use simplified low-voltage circuits. Textbook converter analysis generally assumes ideal components, defined conduction mode, steady state, and controlled parasitics; the practical circuits include diode drops, MOSFET losses, wiring resistance, measurement loading, and thermal limits.

## Ogata: Modern Control Engineering

Use the control-system topics in this sequence:

| Labs | Reading focus |
|---|---|
| 08 | Ch. 2, **Mathematical Modeling of Control Systems**, and Ch. 5, **Transient and Steady-State Response Analysis**: first-order plant behaviour and step-response parameters |
| 11 | Ch. 2, **Mathematical Modeling of Control Systems**: transfer functions, block diagrams, system modelling, and validation |
| 12 | Ch. 6, **Control Systems and Control Systems Components**, and Ch. 7, **Basic Control Actions and Response**: feedback structure, proportional control, and steady-state error |
| 13 | Ch. 7, **Basic Control Actions and Response**, and Ch. 8, **Analysis and Design of Feedback Control Systems**: integral action, system type, and windup |
| 14 | Ch. 7, **Basic Control Actions and Response**, and Ch. 8, **Analysis and Design of Feedback Control Systems**: derivative action, damping, zeros, noise, and PID limitations |
| 15 | Ch. 8, **Analysis and Design of Feedback Control Systems**: closed-loop regulation, disturbance rejection, and plant models |
| 16 | Ch. 8, **Analysis and Design of Feedback Control Systems**, plus Ch. 13, **Control Systems Design by Root Locus**: requirements, modelling, controller selection, simulation, and validation |

The lab equations use continuous-time linear models. Hardware implementation adds sampling, quantisation, sensor scaling, actuator saturation, computation delay, noise, anti-windup requirements, and operating-point dependence.

## Yazdani and Iravani: Voltage-Sourced Converters

Use the VSC topics in this sequence:

| Labs | Reading focus |
|---|---|
| 17 | Ch. 2–4: **voltage-sourced converters**, **PWM**, and **balanced three-phase operation**; search **PLL**, **dq transformation**, **current control**, and **grid-connected VSC** |
| 18 | Ch. 5–7: **unbalanced/islanded operation** and **VSC control**; search **voltage control**, **LC filter**, **droop control**, and **grid-forming converter** |

The labs present simplified low-voltage educational models. Full VSC analysis also includes switching functions, converter current limits, feedforward and dq decoupling, grid strength, synchronization dynamics, protection, modulation constraints, gate-driver interlock, and validated isolated measurement systems.

## Textbook Theory versus Lab Models

| Topic | Textbook-style assumption | Practical lab difference |
|---|---|---|
| PWM and converters | Ideal switching and known duty ratio | Finite switching transitions, dead time, losses, and ripple |
| Buck/boost equations | Steady-state CCM with ideal components | DCM, startup transients, parasitics, load changes, and ratings |
| MOSFET drive | Specified gate voltage and controlled switching | GPIO current limits, gate charge, driver delay, and thermal limits |
| Motor model | Linear first-order plant | Electrical dynamics, friction, delay, saturation, and changing load |
| P/PI/PID control | Continuous linear system with stable feedback | Sampling, noise, saturation, windup, and quantisation |
| Rectifiers and inverters | Ideal source, devices, and filters | Diode drops, source impedance, capacitor ESR, harmonics, and measurement limits |
| Grid VSCs | Defined grid and ideal sensors/controllers | PLL transients, grid impedance, current limits, protection, and safe isolation |

## Recommended Workflow

1. Read the assigned topics before the lab.
2. Write down the model assumptions and expected equations.
3. Build the Simulink or MATLAB prediction.
4. Complete the low-voltage hardware experiment.
5. Compare measured and predicted results.
6. Explain discrepancies using non-ideal components, measurement limits, and model limitations.
