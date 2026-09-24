# Textbook Reading Path

This page connects the practical labs with three reference books. The locators below use the editions identified by ISBN where possible. Chapter numbering can differ between printings, so use the chapter title and section keywords as the reliable locator when your copy is organised differently.

## Books

- **Ogata, _Modern Control Engineering_** — ISBN `9789332550162`
- **Alexander and Sadiku, _Fundamentals of Electric Circuits_** — ISBN `9780072977189`
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

## Recommended Learning Path

Follow the labs in four stages. Read only the listed topics before each lab, then use the experiment to test a prediction.

### Stage 1: Circuit Foundations

Complete Labs 01–04 using Alexander and Sadiku for circuit analysis and Erickson and Maksimovic for MOSFET switching. Focus on predicting waveforms, time constants, energy storage, resonance, and switching behaviour.

### Stage 2: Power-Converter Fundamentals

Complete Labs 05–10 using Erickson and Maksimovic as the main text, with Alexander and Sadiku for circuit refreshers. Focus on switching intervals, volt-second balance, charge balance, conduction modes, ripple, rectification, modulation, and harmonics.

### Stage 3: Control Fundamentals and Design

Before Lab 11, pause for a short Ogata review of differential-equation models, transfer functions, block diagrams, first- and second-order responses, poles, zeros, damping, feedback, and steady-state error. Then complete Labs 11–16 in order.

### Stage 4: Grid-Connected Converter Control

Complete Labs 17–18 after reviewing three-phase circuits in Alexander and Sadiku. Use Yazdani and Iravani for PLLs, dq transformations, current control, voltage control, and droop control.

## Lab-First Roadmap

The roadmap below gives the reading to complete before each experiment. Do not try to finish an entire textbook chapter when only one topic is needed.

| Lab | Lab subtopics | Read before starting | Prediction to prepare |
|---|---|---|---|
| [01 PWM Fundamentals](01_PWM_Fundamentals.md) | Voltage/current/power, duty ratio, period, frequency, average voltage | Alexander and Sadiku, Ch. 1–2: circuit variables, Ohm's law, Kirchhoff's laws, power, and measurement conventions. Erickson and Maksimovic, Ch. 2, **Basic Concepts**: switching waveforms, duty ratio, and averaging | Calculate $T=1/f$ and the ideal average of a PWM waveform from duty ratio and amplitude |
| [02 RC Circuits](02_RC_Circuits.md) | Capacitor charging, discharging, time constant, first-order response | Alexander and Sadiku, Ch. 6: capacitors and energy storage; Ch. 7, **First-Order Circuits**: zero-input/zero-state response and the RC time constant | Calculate $\tau=RC$ and estimate the voltage at $t=\tau$, $3\tau$, and $5\tau$ |
| [03 RLC Circuits](03_RLC_Circuits.md) | Inductor energy, resonance, natural response, damping, ringing | Alexander and Sadiku, Ch. 6: inductors and energy storage; Ch. 8, **Second-Order Circuits**: natural frequency, damping ratio, overdamped/underdamped response, and resonance | Estimate natural frequency, classify damping, and predict whether the waveform rings |
| [04 MOSFET Fundamentals](04_MOSFET_Fundamentals.md) | Threshold voltage, gate drive, $R_{DS(on)}$, conduction and switching loss | Erickson and Maksimovic, Ch. 2, **Basic Concepts**: power semiconductor switches, gate drive, conduction loss, switching loss, and device ratings. Search **device losses** and **gate drive** | Explain why threshold voltage is not the guaranteed fully-on gate voltage and identify the main loss mechanisms |
| [05 DC Chopper Converters](05_DC_Chopper_Converters.md) | Switching intervals, freewheel path, average output, motor-drive action | Alexander and Sadiku, Ch. 1–2: circuit laws applied separately to each switch state. Erickson and Maksimovic, Ch. 3, **Steady-State Converter Analysis**: switching intervals and average conversion | Draw both switch-state circuits and calculate the ideal average output from duty ratio |
| [06 Buck Converter](06_Buck_Converter.md) | Buck operation, inductor current, capacitor voltage, CCM/DCM, ripple | Alexander and Sadiku, Ch. 6–7: inductor/capacitor energy storage and transient response. Erickson and Maksimovic, Ch. 3: **buck converters**, **volt-second balance**, **charge balance**, **CCM**, **DCM**, and **ripple** | Predict $V_o\approx DV_{in}$ in ideal CCM and estimate inductor-current and output-voltage ripple |
| [07 Boost Converter](07_Boost_Converter.md) | Energy transfer, boost ratio, CCM/DCM, duty-ratio limits, stress | Alexander and Sadiku, Ch. 6–7: inductor/capacitor energy storage and transients. Erickson and Maksimovic, Ch. 3: **boost converters**, **inductor energy transfer**, **CCM**, **DCM**, and **duty-ratio limits** | Predict $V_o\approx V_{in}/(1-D)$ in ideal CCM and explain why high duty ratio increases stress |
| [08 PWM Motor Control](08_PWM_Motor_Control.md) | PWM input, motor inertia, speed response, first-order approximation | Erickson and Maksimovic, Ch. 2: converter applications and motor drives. Ogata, Ch. 2, **Mathematical Modeling of Control Systems**, and Ch. 5, **Transient and Steady-State Response Analysis**: first-order models, time constant, rise time, and settling time | Explain why motor speed lags the PWM command and estimate the mechanical time constant from a step response |
| [09 AC-DC Rectifiers](09_AC_DC_Rectifiers.md) | Sinusoidal input, diode conduction, rectification, capacitive filtering, ripple | Alexander and Sadiku, Ch. 9–10: sinusoidal steady state and phasors; Ch. 11: AC power. Erickson and Maksimovic, Ch. 3: **diode rectifiers** and **capacitive filtering** | Sketch conduction intervals, estimate average DC output, and predict ripple direction and magnitude |
| [10 DC-AC Inverters](10_DC_AC_Inverters.md) | H-bridge states, square wave, SPWM, RMS value, fundamental, harmonics | Alexander and Sadiku, Ch. 17, **Fourier Series**: square-wave coefficients, RMS, and harmonic content. Erickson and Maksimovic, Ch. 3: **inverters**, **bridge converters**, **modulation**, **harmonics**, and **filters** | Identify bridge and fundamental components and predict how modulation or filtering changes the waveform |
| [11 System Identification](11_System_Identification.md) | Model structure, transfer function, step response, parameter estimation | Ogata, Ch. 2, **Mathematical Modeling of Control Systems**: differential-equation models, transfer functions, block diagrams, and model validation. Review Ch. 5 first- and second-order response | Select a model structure, estimate its parameters from a step response, and state the assumptions |
| [12 P Controller](12_P_Controller.md) | Feedback, error, proportional gain, closed-loop response, stability | Ogata, Ch. 6, **Control Systems and Control Systems Components**: feedback components and measurement. Ch. 7, **Basic Control Actions and Response**: proportional action, sensitivity, and steady-state error | Predict how increasing $K_p$ changes error, speed of response, and overshoot |
| [13 PI Controller](13_PI_Controller.md) | Integral action, system type, zero steady-state error, saturation, windup | Ogata, Ch. 7: integral control and system type. Ch. 8, **Analysis and Design of Feedback Control Systems**: steady-state error, controller implementation, saturation, and windup | Predict the reduction in steady-state error and identify when the integrator will continue accumulating |
| [14 PID Controller](14_PID_Controller.md) | Derivative action, damping, overshoot, zeros, noise, filtering | Ogata, Ch. 7: derivative action and basic control actions. Ch. 8: zeros, transient response, noise sensitivity, and practical PID limitations | Predict the effect of derivative action on damping and explain why derivative measurement is filtered |
| [15 Closed-Loop Buck](15_Closed_Loop_Buck.md) | Converter plant, feedback regulation, disturbance rejection, averaged model | Ogata, Ch. 8: closed-loop regulation, disturbance rejection, and plant models. Erickson and Maksimovic, Ch. 3: buck energy transfer, steady-state relationships, and averaged converter behaviour | Predict regulated output and response to input/load disturbance before closing the loop |
| [16 Controller Design](16_Controller_Design.md) | Requirements, model choice, stability, root locus, validation | Ogata, Ch. 8: feedback design and performance requirements. Ch. 13, **Control Systems Design by Root Locus**: root-locus construction, gain selection, dominant poles, and transient specifications | Convert rise-time, overshoot, and settling-time requirements into a controller choice and test |
| [17 Grid-Following VSC](17_Grid_Following_VSC.md) | Three-phase background, PLL, dq frame, current control, active/reactive current | Alexander and Sadiku, Ch. 12: three-phase circuits and balanced systems. Yazdani and Iravani, Ch. 2–4: VSC operation, PWM, balanced three-phase operation, PLL, dq transformation, and grid-connected current control | Explain why synchronization is required and predict how dq current commands affect AC power |
| [18 Grid-Forming VSC](18_Grid_Forming_VSC.md) | Voltage-source operation, LC filter, voltage/frequency control, droop, islanding | Alexander and Sadiku, Ch. 12: three-phase voltage/current relationships. Yazdani and Iravani, Ch. 5–7: islanded operation, VSC control, voltage control, LC filters, droop control, and grid-forming converters | Predict how voltage and frequency change with load and how droop shares the load response |

## Alexander and Sadiku: Fundamentals of Electric Circuits

Use this book for the circuit foundations that support the power-electronics labs:

| Labs | Reading focus |
|---|---|
| 01, 05 | Ch. 1–2: voltage, current, power, Ohm's law, Kirchhoff's laws, and circuit averages |
| 02 | Ch. 6–7: capacitors, inductors, and first-order RC/RL circuits |
| 03 | Ch. 8: second-order RLC circuits, natural response, and damping |
| 06–07 | Ch. 6–7: energy storage and transient intuition; pair with Erickson and Maksimovic for converter analysis |
| 09 | Ch. 9–11: sinusoidal steady state, phasors, and AC power |
| 10 | Ch. 17: Fourier series and harmonic content |
| 17–18 | Ch. 12: three-phase circuits as background; use Yazdani and Iravani for VSC control |

Alexander and Sadiku does not replace a power-electronics text: MOSFET switching, buck/boost converter operation, PWM converter modulation, and VSC control remain assigned to Erickson and Maksimovic or Yazdani and Iravani.

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
