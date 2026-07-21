# Project 16 - Grid-Following Voltage Source Converter (VSC)

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_PWM_Motor_Control.md
- 06_P_Controller.md
- 07_PI_Controller.md
- 08_PID_Controller.md
- 09_Buck_Converter.md
- 10_Closed_Loop_Buck.md
- 11_Boost_Converter.md
- 11B_DC_Chopper_Converters.md
- 12_AC_DC_Rectifiers.md
- 13_DC_AC_Inverters.md
- 14_System_Identification.md
- 15_Controller_Design.md

---

## Objective

In this project you will learn:

- What a Grid-Following Converter is
- Why synchronization is required
- How a Phase Locked Loop (PLL) works
- How current is injected into an AC system
- How SPWM controls an inverter
- How current control loops work
- How dq control simplifies AC control
- How modern solar and battery inverters operate

This is the capstone project for the course.

---

## Safety Notice

### Important

This project:

```text
MUST NOT
```

be connected directly to mains power.

All experiments must use:

```text
Low Voltage AC Sources
```

such as:

- Function generators
- Isolated AC laboratory supplies
- Signal generators

Recommended AC test voltage:

```text
1 V to 10 V RMS
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Following Operation

✅ Explain PLL Synchronization

✅ Explain Current Injection

✅ Design a Current Controller

✅ Implement PI Regulation

✅ Generate SPWM

✅ Understand dq Control

✅ Understand Modern Renewable Energy Converters

---

## Introduction

Most modern renewable energy systems use:

```text
Grid-Following
```

converters.

Examples:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Grid-Tied Converters

---

## What Is a Grid-Following Converter?

A Grid-Following Converter does not create the grid voltage.

Instead:

```text
The Grid Creates Voltage

The Converter Injects Current
```

---

## Why Current Control?

The grid already establishes:

- Voltage magnitude
- Frequency
- Phase angle

The inverter therefore controls:

```text
Current
```

rather than voltage.

---

## Power Transfer

Real power is:

$$
P = VI\cos(\phi)
$$

Where:

- $V$ = Grid Voltage
- $I$ = Grid Current
- $\phi$ = Phase Difference

---

## Power Flow Example

If:

```text
Voltage and Current
```

are in phase:

$$
\phi=0
$$

then:

$$
P=VI
$$

Maximum real power is transferred.

---

## Overall Control Structure

```text
Grid Voltage
       ↓
      PLL
       ↓
 Grid Angle θ
       ↓
 Current Controller
       ↓
     SPWM
       ↓
   Inverter
       ↓
    Filter
       ↓
      Grid
```

---

## Hardware Overview

The laboratory setup consists of:

```text
AC Source
```

+

```text
Measurement System
```

+

```text
Controller
```

+

```text
Inverter
```

+

```text
Filter
```

---

## Recommended Hardware

### Controller

Recommended:

- ESP32
- STM32 Nucleo

Acceptable:

- Arduino Mega

---

### Oscilloscope

- DSO Nano
- FNIRSI Scope
- Bench Oscilloscope

---

### Signal Generator

Used as the simulated grid.

Examples:

- FY6900
- JDS6600
- Function Generator

---

### Current Sensor

Recommended:

- ACS712
- ACS758

---

### Voltage Measurement

Recommended:

- Resistor Divider
- Isolation Amplifier (Advanced)

---

### Inverter Stage

- MOSFET H-Bridge
- MOSFET Driver

Examples:

- IR2104
- IR2110

---

### Filter

Recommended:

```text
L Filter
```

for first implementation.

Typical:

```text
1 mH to 5 mH
```

---

## Hardware Purchasing Checklist

### Essential

- ESP32 Development Board
- Function Generator
- Current Sensor
- MOSFET Driver
- MOSFET H-Bridge
- Inductor
- Breadboard or Prototype PCB

---

### Recommended

- Differential Probe
- External Power Supply
- Bench Oscilloscope

---

## System Schematic

```text
Function Generator
        │
        ▼
 Grid Voltage

        │
 ┌──────┴──────┐
 │             │
 ▼             ▼

PLL      Voltage Sensor

 │
 ▼

Current Controller

 │
 ▼

SPWM Generator

 │
 ▼

H-Bridge Inverter

 │
 ▼

L Filter

 │
 ▼

Current Sensor

 │
 ▼

Simulated Grid
```

---

## Concept of Synchronization

Before current can be injected:

```text
Grid Position
```

must be known.

---

## Grid Voltage

Assume:

$$
v(t)=V_m\sin(\omega t)
$$

The controller must determine:

- Frequency
- Phase
- Zero Crossings

---

## Phase Locked Loop (PLL)

A PLL estimates:

$$
\theta
$$

where:

$$
\theta=\omega t
$$

---

## PLL Purpose

The PLL continuously estimates:

```text
Grid Angle
```

and:

```text
Grid Frequency
```

---

## Why Is The PLL Important?

Without synchronization:

```text
Current Injection
```

will occur at the wrong phase angle.

This can result in:

- Poor power transfer
- Instability
- Excessive current

---

## Simplified PLL Block Diagram

```text
Grid Voltage
       ↓
 Phase Detector
       ↓
 PI Controller
       ↓
 Frequency Estimate
       ↓
 Integrator
       ↓
 Grid Angle θ
```

---

## Review of PI Controllers

From earlier projects:

$$
u(t)
=
K_Pe(t)
+
K_I
\int e(t)\,dt
$$

The PLL itself contains a PI controller.

---

## Grid Angle

The PLL produces:

$$
\theta
$$

This angle is used throughout the controller.

---

## Why Use dq Control?

AC currents are sinusoidal.

Sinusoids are difficult to regulate directly.

---

## dq Transformation

The dq transform converts:

```text
Sinusoidal Signals
```

into approximately:

```text
DC Signals
```

---

## Example

Current:

$$
i(t)=10\sin(\omega t)
$$

becomes approximately:

```text
Id = 10

Iq = 0
```

which is easier to regulate.

---

## Current Reference

Example:

```text
Inject 1 A
```

---

## Current Error

The current controller calculates:

$$
e
=
I_d^*
-
I_d
$$

Where:

- $I_d^*$ = Reference Current
- $I_d$ = Measured Current

---

## Current PI Controller

The controller output is:

$$
u
=
K_Pe
+
K_I\int e\,dt
$$

---

## SPWM Generation

The controller output is converted into:

```text
Sinusoidal PWM
```

for the inverter.

---

## Inverter Stage

The inverter converts:

```text
DC
```

into:

```text
Controlled AC
```

using:

- H-Bridge
- MOSFETs
- SPWM

---

## Output Filter

The inverter output is PWM.

An inductor smooths the current.

---

## Why Is The Filter Required?

Without a filter:

```text
Large PWM Ripple
```

would be injected into the grid.

---

## L Filter

Simplified structure:

```text
Inverter
    │
    L
    │
 Grid
```

---

## Current Measurement

Current feedback is essential.

Possible sensors:

### ACS712

Low cost.

---

### ACS758

Higher current capability.

---

## Control Loop Summary

```text
Measure Grid Voltage
           ↓
          PLL
           ↓
      Angle θ
           ↓
     Current Error
           ↓
     PI Controller
           ↓
          SPWM
           ↓
       Inverter
           ↓
        Filter
           ↓
 Inject Current
```

---

## Experiment 1 - PLL Observation

### Objective

Measure grid phase angle.

---

## Procedure

Generate:

```text
50 Hz Sine Wave
```

using the function generator.

Observe:

```text
Zero Crossings
```

and:

```text
PLL Tracking
```

---

## Experiment 2 - SPWM Generation

### Objective

Create sinusoidal PWM.

---

## Observe

Measure:

- PWM Frequency
- Modulation Index
- Duty Cycle Variation

---

## Experiment 3 - Inverter Output

### Objective

Measure filtered inverter voltage.

---

## Measurements

Record:

| Parameter | Value |
|-----------|-------|
| PWM Frequency | |
| Grid Frequency | |
| RMS Voltage | |
| Peak Voltage | |

---

## Experiment 4 - Current Control

### Objective

Regulate injected current.

---

## Setpoint Tests

```text
0.5 A

1.0 A

1.5 A
```

---

## Results Table

| Current Reference | Measured Current |
|------------------|------------------|
| 0.5 A | |
| 1.0 A | |
| 1.5 A | |

---

## MATLAB Simulation

Before building, simulate three key subsystems: PLL angle tracking, SPWM generation, and the PI current controller on an L-filter plant.

```matlab
f_grid = 50;          % Hz
Vm     = 5;           % V peak (signal generator level)
L      = 1e-3;        % filter inductance (H)
R      = 1;           % winding resistance (Ohm)
I_ref  = 0.5;         % current reference (A)
Kp_cc  = 2;           % current controller Kp
Ki_cc  = 50;          % current controller Ki
f_pwm  = 10000;       % PWM carrier frequency (Hz)

t = 0:1e-5:0.1;
theta = 2*pi*f_grid*t;
v_grid = Vm * sin(theta);

% --- Subplot 1: PLL angle tracking ---
figure;
subplot(3,1,1);
plot(t, theta - 2*pi*floor(theta/(2*pi)), 'b', 'LineWidth', 1.5);
xlabel('Time (s)'); ylabel('\theta (rad)');
title(sprintf('PLL Angle Tracking  f_{grid}=%d Hz', f_grid));
grid on;

% --- Subplot 2: SPWM carrier vs modulating signal ---
subplot(3,1,2);
carrier = 2*abs(mod(t, 1/f_pwm)/(1/f_pwm) - 0.5) - 0.5;  % triangle, no toolbox needed
mod_sig = sin(theta);                      % modulating sine
plot(t(1:500), carrier(1:500), 'k', t(1:500), mod_sig(1:500), 'r', 'LineWidth', 1);
legend('Carrier','Modulating'); grid on;
xlabel('Time (s)'); ylabel('Amplitude');
title(sprintf('SPWM  f_{pwm}=%d Hz', f_pwm));

% --- Subplot 3: PI current controller closed-loop step response ---
subplot(3,1,3);
s   = tf('s');
G_L = 1 / (L*s + R);          % L-filter plant
C   = Kp_cc + Ki_cc/s;        % PI current controller
T   = feedback(C*G_L, 1);
[y, t2] = step(I_ref * T, 0:1e-5:0.05);
plot(t2, y, 'b', 'LineWidth', 1.5); hold on;
yline(I_ref, 'k--');
xlabel('Time (s)'); ylabel('Current (A)');
title(sprintf('PI Current Controller  Kp=%.1f Ki=%.0f  L=%.0fmH', Kp_cc, Ki_cc, L*1e3));
grid on;

si = stepinfo(T);
fprintf('Rise time:     %.4f s\n', si.RiseTime);
fprintf('Overshoot:     %.1f %%\n', si.Overshoot);
fprintf('Settling time: %.4f s\n', si.SettlingTime);
```

Record the predicted current controller rise time and overshoot before running Experiment 4.

---

## MATLAB Comparison

After completing the experiments, enter your measured current tracking data and compare against the simulated PI response.

```matlab
% --- Enter your system parameters ---
L      = 1e-3;    % your filter inductance (H)
R      = 1;       % estimated winding resistance (Ohm)
Kp_cc  = 2;       % gains used in Experiment 4
Ki_cc  = 50;
I_ref  = 0.5;     % A
f_grid = 50;      % Hz — from your signal generator

% --- Enter measured current step response (time in s, current in A) ---
t_meas = [0, 0.002, 0.005, 0.010, 0.015, 0.020, 0.030, 0.040, 0.050]; % replace
i_meas = [0, 0.15,  0.38,  0.52,  0.50,  0.50,  0.50,  0.50,  0.50];  % replace

% --- Enter measured grid frequency from oscilloscope ---
f_meas = 50.2;    % Hz — replace with your reading

s   = tf('s');
G_L = 1 / (L*s + R);
C   = Kp_cc + Ki_cc/s;
T   = feedback(C*G_L, 1);
[y_sim, t_sim] = step(I_ref * T, 0:1e-5:0.05);

figure;
subplot(2,1,1);
plot(t_sim, y_sim, 'b-', 'LineWidth', 1.5); hold on;
plot(t_meas, i_meas, 'ro--', 'MarkerSize', 6);
yline(I_ref, 'k--');
legend('Simulated','Measured'); grid on;
xlabel('Time (s)'); ylabel('Current (A)');
title(sprintf('PI Current Controller: Simulated vs Measured  Kp=%.1f Ki=%.0f', Kp_cc, Ki_cc));

subplot(2,1,2);
bar([f_grid, f_meas]);
set(gca,'XTickLabel',{'Setpoint','Measured'});
ylabel('Frequency (Hz)'); grid on;
title(sprintf('Grid Frequency Error: %.2f Hz  (%.3f %%)', ...
    abs(f_meas-f_grid), abs(f_meas-f_grid)/f_grid*100));

% --- Metrics ---
si = stepinfo(T);
fprintf('Simulated rise time:    %.4f s\n', si.RiseTime);
fprintf('Simulated overshoot:    %.1f %%\n', si.Overshoot);
fprintf('Simulated settling time:%.4f s\n', si.SettlingTime);
fprintf('Grid frequency error:   %.3f %%\n', abs(f_meas-f_grid)/f_grid*100);

% Estimated measured settling time
final = i_meas(end);
within2 = find(abs(i_meas - final) <= 0.02*final, 1);
if ~isempty(within2)
    fprintf('Measured settling time:  %.4f s\n', t_meas(within2));
end
```

Reflection questions:

1. Does the simulated current rise time match the measured result? What physical effects (e.g. MOSFET dead-time, sensor delay) could explain any difference?
2. How does the grid frequency error affect the PLL angle estimate over time?
3. What would happen to current injection if the PLL lost lock mid-cycle?

---

## Engineering Applications

Grid-following VSCs are used in:

### Solar Inverters

Grid-connected photovoltaic systems.

---

### Battery Storage

Energy storage integration.

---

### EV Chargers

Bidirectional charging systems.

---

### Renewable Energy Systems

Grid support and power conversion.

---

### HVDC Systems

Large-scale power transmission.

---

## Knowledge Check

### Question 1

What does a grid-following converter control?

Answer:

```text
____________________
```

---

### Question 2

Why is a PLL required?

Answer:

```text
____________________
```

---

### Question 3

Why is current control used instead of voltage control?

Answer:

```text
____________________
```

---

### Question 4

What is the purpose of the output filter?

Answer:

```text
____________________
```

---

### Question 5

Why is dq control useful?

Answer:

```text
____________________
```

---

### Question 6

During Experiment 4 your measured current settling time was longer than the MATLAB simulation predicted. List two physical causes and explain how you would update the plant model `G(s) = 1/(Ls + R)` to account for them.

Answer:

```text
____________________
```

---

## Common Mistakes

### PLL Not Locking

Check:

- Signal quality
- Frequency measurement
- PI gains

---

### Excessive Current Ripple

Check:

- Filter inductance
- PWM frequency

---

### Unstable Current Control

Check:

- Controller gains
- Current sensor calibration

---

### Poor Synchronization

Check:

- Phase estimation
- Sampling rate

---

## Troubleshooting Checklist

✅ Grid signal available

✅ PLL locked

✅ SPWM operating

✅ H-Bridge switching correctly

✅ Filter installed

✅ Current sensor operating

✅ Current tracking reference

✅ Stable system operation

---

## Final Course Summary

This project combines:

✅ PWM

✅ MOSFET Switching

✅ Inverters

✅ PI Controllers

✅ Signal Processing

✅ Control Systems

✅ System Identification

✅ Power Electronics

✅ AC Systems

✅ Renewable Energy Concepts

into a complete modern converter control architecture.

You have now progressed from basic PWM generation to the same fundamental control structure used in modern:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Utility-Scale Converters
- Grid Support Systems

and have completed the full introductory power electronics and control engineering pathway.
