# Textbook Reading Path

This page connects the practical labs with three reference books. The locators below use the editions identified by ISBN where possible. Chapter numbering can differ between printings, so use the chapter title and section keywords as the reliable locator when your copy is organised differently.

## Books

- **Ogata, _Modern Control Engineering_** — ISBN `9789332550162`
- **Yazdani and Iravani, _Voltage-Sourced Converters in Power Systems_** — ISBN `9780470521564`
- **Erickson and Maksimovic, _Fundamentals of Power Electronics_** — ISBN `9783030438791`

## How to Use the Path

Use the lab roadmap first, then use the book tables to locate the relevant chapter. Read the core topics before the lab; treat the search terms as follow-up reading when you need more depth. The chapter title and section keywords are reliable locators when chapter numbering differs between editions.

Before each lab, write down three things:

1. The model or control block you expect to use.
2. One equation or relationship that predicts the result.
3. The assumptions that could make the measurement differ from the prediction.

After the lab, compare the prediction with the simulation and measurement, then explain the largest difference.

## Practical Prerequisites

Complete Labs 00A–00C before the theory sequence:

- **00A:** Arduino and ESP32 programming, GPIO, ADC, PWM, and serial communication
- **00B:** Oscilloscope operation, probing, triggering, and waveform measurement
- **00C:** ESP32 setup, logic levels, ADC limitations, PWM, and WiFi-related constraints

These are equipment and implementation prerequisites rather than assigned textbook reading.

## Lab-First Roadmap

This is the recommended order. The reading is deliberately placed before the practical work so that each experiment tests a prediction rather than introducing the theory afterwards.

| Lab | Read before starting | What the reading prepares you to predict |
|---|---|---|
| [01 PWM Fundamentals](01_PWM_Fundamentals.md) | Erickson and Maksimovic, Ch. 2, **Basic Concepts** | Duty-cycle, period, frequency, and average voltage |
| [02 RC Circuits](02_RC_Circuits.md) | Erickson and Maksimovic, Ch. 2–3: capacitor energy and transients | RC time constant and charging curve |
| [03 RLC Circuits](03_RLC_Circuits.md) | Erickson and Maksimovic, Ch. 2–3: energy storage, resonance, and damping | Natural frequency, ringing, and damping |
| [04 MOSFET Fundamentals](04_MOSFET_Fundamentals.md) | Erickson and Maksimovic, Ch. 2: switches, gate drive, and losses | Gate-voltage behaviour and switching loss |
| [05 DC Chopper Converters](05_DC_Chopper_Converters.md) | Erickson and Maksimovic, Ch. 3: chopper operation | Switching intervals and average output voltage |
| [06 Buck Converter](06_Buck_Converter.md) | Erickson and Maksimovic, Ch. 3: buck converters, CCM/DCM, and ripple | Output voltage, inductor current, and ripple |
| [07 Boost Converter](07_Boost_Converter.md) | Erickson and Maksimovic, Ch. 3: boost converters and duty-ratio limits | Conversion ratio and safe operating limits |
| [08 PWM Motor Control](08_PWM_Motor_Control.md) | Erickson and Maksimovic, Ch. 2; Ogata, Ch. 2 and 5 | Motor input response and first-order speed dynamics |
| [09 AC-DC Rectifiers](09_AC_DC_Rectifiers.md) | Erickson and Maksimovic, Ch. 3: diode rectifiers and filtering | Average DC output and ripple |
| [10 DC-AC Inverters](10_DC_AC_Inverters.md) | Erickson and Maksimovic, Ch. 3: inverters, modulation, and harmonics | Bridge waveform, RMS value, and fundamental component |
| [11 System Identification](11_System_Identification.md) | Ogata, Ch. 2, **Mathematical Modeling of Control Systems** | Model structure, parameters, and step response |
| [12 P Controller](12_P_Controller.md) | Ogata, Ch. 6–7: feedback and proportional control | Gain, error, and closed-loop response |
| [13 PI Controller](13_PI_Controller.md) | Ogata, Ch. 7–8: integral action and system type | Steady-state error and windup behaviour |
| [14 PID Controller](14_PID_Controller.md) | Ogata, Ch. 7–8: derivative action and feedback design | Damping, overshoot, and noise sensitivity |
| [15 Closed-Loop Buck](15_Closed_Loop_Buck.md) | Ogata, Ch. 8; Erickson and Maksimovic, Ch. 3 | Regulation and disturbance rejection |
| [16 Controller Design](16_Controller_Design.md) | Ogata, Ch. 8 and 13: feedback design and root locus | Design choice and performance requirements |
| [17 Grid-Following VSC](17_Grid_Following_VSC.md) | Yazdani and Iravani, Ch. 2–4: PLL, dq control, and grid-connected VSCs | Synchronization and current injection |
| [18 Grid-Forming VSC](18_Grid_Forming_VSC.md) | Yazdani and Iravani, Ch. 5–7: VSC control and islanded operation | Voltage, frequency, and droop response |

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
