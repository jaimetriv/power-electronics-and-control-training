# Project 17 - Grid-Forming Voltage Source Converter (VSC)

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
- 16_Grid_Following_VSC.md

---

## Objective

In this project you will learn:

- What a Grid-Forming Converter is
- How Grid-Forming differs from Grid-Following
- How an inverter creates voltage and frequency
- Voltage feedback control
- Frequency regulation
- SPWM implementation
- Droop control
- Virtual Synchronous Machine concepts
- Microgrid fundamentals

This project serves as the capstone project for the course.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Forming operation

✅ Generate AC voltage autonomously

✅ Implement SPWM

✅ Implement voltage feedback

✅ Regulate output voltage

✅ Explain droop control

✅ Understand Virtual Synchronous Machines

✅ Compare Grid-Following and Grid-Forming converters

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

All experiments must use:

- Low-voltage DC supplies
- Low-power loads
- Isolated laboratory circuits

Recommended:

```text
12 V DC Input

5–12 V RMS Output
```

---

## Introduction

Project 16 introduced:

```text
Grid-Following Converters
```

Those converters require an existing grid.

They:

```text
Measure Voltage

Inject Current
```

---

## What If No Grid Exists?

Examples:

- Microgrids
- Battery Systems
- Standalone Power Systems
- Backup Generators

There may be:

```text
No Existing Voltage Reference
```

The inverter must therefore create:

```text
Voltage

Frequency

Phase
```

itself.

---

## Grid-Forming Concept

A Grid-Forming converter behaves as an AC voltage source.

Instead of:

```text
Current Control
```

it primarily performs:

```text
Voltage Control
```

---

## Grid-Following versus Grid-Forming

| Feature | Grid-Following | Grid-Forming |
|----------|--------------|--------------|
| PLL Required | Yes | No |
| Existing Grid Required | Yes | No |
| Controls Current | Yes | Usually |
| Controls Voltage | No | Yes |
| Controls Frequency | No | Yes |
| Black Start | No | Yes |
| Islanded Operation | No | Yes |

---

## Black Start Capability

A Grid-Forming converter can:

```text
Start a Dead Network
```

without requiring an external voltage source.

This capability is known as:

```text
Black Start
```

---

## Complete System Architecture

```text
          Voltage Reference
                  │
                  ▼
         Frequency Generator
                  │
                  ▼
           PI Controller
                  │
                  ▼
         Modulation Index
                  │
                  ▼
                SPWM
                  │
                  ▼
             H-Bridge
                  │
                  ▼
             LC Filter
                  │
                  ▼
                Load
                  ▲
                  │
           Voltage Sensor
                  │
                  └────────── Feedback
```

---

## Hardware Requirements

### Controller

Recommended:

```text
ESP32 DevKit
```

Alternatives:

```text
STM32 Nucleo

Arduino Mega
```

---

### Inverter Stage

### Gate Driver

```text
IR2104
```

Recommended.

Alternative:

```text
IR2110
```

---

### MOSFETs

```text
4 × IRLZ44N
```

---

### Sensors

### Voltage Measurement

```text
Resistor Divider
```

### Current Measurement

```text
ACS712
```

or

```text
ACS758
```

---

### LC Filter

### Inductor

```text
1 mH to 5 mH
```

### Capacitor

```text
1 µF Film Capacitor
```

---

### Test Equipment

- DSO Nano
- Multimeter
- Bench Power Supply

---

## Complete Materials List

```text
ESP32 DevKit

IR2104 Driver

4 × IRLZ44N MOSFETs

ACS712 Current Sensor

1 mH Inductor

1 µF Film Capacitor

470 µF Electrolytic Capacitor

100 nF Ceramic Capacitor

12 V Bench Supply

DSO Nano

Breadboard

Jumper Wires

Multimeter
```

---

## Full System Schematic

```text
                    +12V DC Supply
                           │
                           │
                    DC Link Capacitor
                           │
                           ▼

                  ┌────────────────┐
                  │   H-BRIDGE     │
                  │ Q1 Q2 Q3 Q4    │
                  └───────┬────────┘
                          │

                       SPWM
                          ▲
                          │

                  ┌─────────────┐
                  │    ESP32    │
                  │             │
                  │ PI Control  │
                  │ Frequency   │
                  │ Generator   │
                  └─────┬───────┘
                        │

             ┌──────────┴──────────┐

             ▼                     ▼

      Voltage Sensor        Current Sensor

             ▲                     ▲

             └─────────┬───────────┘
                       │

                    LC Filter

                       │

                       ▼

                      Load
```

---

## DC Link Circuit

Every practical inverter requires a DC-link capacitor.

```text
          +12 V Supply

                │

           ┌────────┐

           │ 470µF  │

           │        │

           └────────┘

                │

           H-Bridge
```

Recommended:

```text
470 µF Electrolytic

+

100 nF Ceramic
```

mounted near the MOSFET bridge.

---

## Full H-Bridge Schematic

```text
              +Vdc
                │
          ┌─────┴─────┐
          │           │
         Q1          Q2
          │           │
          ├─── LOAD ──┤
          │           │
         Q3          Q4
          │           │
          └─────┬─────┘
                │
               GND
```

---

## H-Bridge Operation

### Positive Half-Cycle

Turn ON:

```text
Q1

Q4
```

Current flows:

```text
+Vdc

 ↓

Q1

 ↓

Load

 ↓

Q4

 ↓

GND
```

---

### Negative Half-Cycle

Turn ON:

```text
Q2

Q3
```

Current flows in the opposite direction.

---

## Shoot-Through Warning

Never enable:

```text
Q1 and Q3
```

or:

```text
Q2 and Q4
```

simultaneously.

This creates:

```text
Direct Supply Short Circuit
```

---

## Dead Time

A delay is inserted between switching events.

This delay is called:

```text
Dead Time
```

Typical values:

```text
1 µs to 5 µs
```

---

## Example Dead-Time Logic

```text
Q1 OFF

Wait

Q4 OFF

Wait

Q2 ON

Q3 ON
```

---

## MOSFET Driver Connections

Example using an IR2104.

```text
             ESP32

         PWM_H   PWM_L
            │      │
            ▼      ▼

            IR2104

          HO      LO

           │       │

           ▼       ▼

          Q1      Q3

          Q2      Q4
```

---

## LC Output Filter

The H-Bridge output contains PWM ripple.

An LC filter smooths the waveform.

```text
            H-Bridge

                │

                L

                │

                ●────── Load

                │

                C

                │

               GND
```

---

## Why Use an LC Filter?

Advantages:

✅ Lower harmonic distortion

✅ Reduced ripple

✅ Better voltage quality

✅ Improved sine-wave approximation

---

## Voltage Measurement Circuit

The ESP32 must never measure the inverter voltage directly.

Use a divider:

```text
Output Voltage

      │

     47 kΩ

      │──── ADC

     10 kΩ

      │

     GND
```

---

## Current Measurement Circuit

Place the ACS712 after the filter.

```text
          LC Filter

               │

               ▼

            ACS712

               │

               ▼

              Load
```

---

## Voltage Reference

The inverter generates:

$$
v^*(t)
=
V_m \sin(\omega t)
$$

Where:

- $V_m$ = Desired Peak Voltage
- $\omega$ = Angular Frequency

---

## Example

Desired output:

$$
v^*(t)
=
5\sin(2\pi50t)
$$

Produces:

```text
50 Hz AC Reference
```

---

## Internal Oscillator

Unlike Grid-Following converters:

```text
No PLL Required
```

The inverter generates its own electrical angle.

---

## Angle Generation

$$
\theta
=
\omega t
$$

where:

$$
\omega
=
2\pi f
$$

For:

$$
f=50Hz
$$

---

## Voltage Error

The controller computes:

$$
e
=
V^*
-
V
$$

---

## Voltage Control Loop

```text
Voltage Reference
        ↓
   Error Calculation
        ↓
    PI Controller
        ↓
  Modulation Index
        ↓
       SPWM
        ↓
     Inverter
        ↓
   Output Voltage
        ↓
      Feedback
```

---

## PI Voltage Controller

$$
u
=
K_Pe
+
K_I\int e\,dt
$$

---

## Why Use PI Control?

The PI controller:

✅ Removes steady-state error

✅ Improves regulation

✅ Compensates for load changes

---

## Modulation Index

Symbol:

$$
m
$$

Range:

```text
0 to 1
```

Relationship:

$$
V_{OUT} \propto m
$$

As modulation index increases:

```text
Output Voltage Increases
```

---

## SPWM Implementation

SPWM stands for:

```text
Sinusoidal Pulse Width Modulation
```

---

## SPWM Concept

A sine-wave reference is compared with a high-frequency carrier.

---

## Comparator Logic

If:

```text
Reference > Carrier
```

PWM Output:

```text
HIGH
```

If:

```text
Reference < Carrier
```

PWM Output:

```text
LOW
```

---

## SPWM Hardware Flow

```text
50 Hz Reference
       │
       ▼

   sin(theta)

       │
       ▼

Compare With

20 kHz Carrier

       │
       ▼

 PWM Pulses

       │
       ▼

 MOSFET Driver

       │
       ▼

   H-Bridge
```

---

## Conceptual SPWM Pattern

```text
| |
| | |
| | | |
| | | | |
| | | | | |
| | | | |
| | | |
```

---

## Digital SPWM Implementation

```cpp
theta += omega * Ts;

if(theta > 2 * PI)
{
    theta -= 2 * PI;
}

float reference = sin(theta);

int pwm =
    (int)(127 + 127 * reference);

pwm = constrain(pwm,0,255);
```

Where:

- `theta` = Electrical Angle
- `omega` = Angular Frequency
- `Ts` = Sampling Time
- `reference` = Sine Reference
- `pwm` = PWM Duty Cycle

---

## Relationship Between PI and SPWM

```text
Voltage Error
      ↓
PI Controller
      ↓
Modulation Index
      ↓
SPWM Generator
      ↓
Gate Signals
      ↓
H-Bridge
```

---

## Frequency Regulation

The converter maintains:

$$
f = 50Hz
$$

independently of load conditions.

---

## Droop Control

Grid-Forming converters often emulate synchronous generators.

---

## Active Power Droop

$$
f
=
f_0
-
K_P(P-P_0)
$$

---

## Reactive Power Droop

$$
V
=
V_0
-
K_Q(Q-Q_0)
$$

---

## Why Use Droop Control?

Droop allows:

```text
Multiple Inverters
```

to share loads automatically.

---

## Virtual Synchronous Machine (VSM)

A Virtual Synchronous Machine emulates the behavior of a rotating generator using software.

---

## Benefits of VSM Control

✅ Synthetic Inertia

✅ Better Frequency Stability

✅ Improved Dynamic Response

✅ Enhanced Microgrid Performance

---

## Recommended Build Stages

### Stage 1

Generate a 50 Hz reference.

Verify:

```text
Frequency

Amplitude
```

---

### Stage 2

Generate SPWM.

Verify:

```text
PWM Frequency

Duty Cycle Variation
```

---

### Stage 3

Build and test the H-Bridge.

Verify:

```text
Alternating Output Voltage
```

---

### Stage 4

Install the LC Filter.

Verify:

```text
Smooth AC Voltage
```

---

### Stage 5

Implement Voltage Measurement.

Verify ADC accuracy.

---

### Stage 6

Implement PI Voltage Control.

Verify stable regulation.

---

### Stage 7

Implement Droop Control.

Study power-sharing behavior.

---

## Experiment 1 - Generate AC Voltage

### Objective

Generate a stable AC voltage waveform.

---

## Measurements

| Parameter | Measured |
|------------|----------|
| Frequency | |
| RMS Voltage | |
| Peak Voltage | |

---

## Experiment 2 - Load Regulation

### Test Loads

```text
100 Ω

220 Ω

470 Ω
```

---

## Results Table

| Load | Output Voltage |
|--------|---------------|
| 100 Ω | |
| 220 Ω | |
| 470 Ω | |

---

## Experiment 3 - PI Tuning

Measure:

- Overshoot
- Settling Time
- Voltage Error
- Stability

for different gain settings.

---

## MATLAB Simulation

Before building, simulate the LC filter response, the PI voltage controller, and the droop characteristic to predict hardware behaviour.

```matlab
% System parameters
Vm     = 5;       % desired peak output voltage (V)
f_grid = 50;      % Hz
L      = 1e-3;    % filter inductance (H)
C      = 1e-6;    % filter capacitance (F)
R_load = 220;     % load resistance (Ohm)
Kp_v   = 3;       % voltage controller Kp
Ki_v   = 100;     % voltage controller Ki

s = tf('s');

% LC filter plant (voltage across C with load)
G_lc = R_load / (L*C*R_load*s^2 + L*s + R_load);

% PI voltage controller
C_pi = Kp_v + Ki_v/s;
T_v  = feedback(C_pi * G_lc, 1);

t = 0:1e-5:0.05;

figure;

% --- Subplot 1: LC filter Bode plot ---
subplot(3,1,1);
bode(G_lc); grid on;
title(sprintf('LC Filter Bode  L=%.0fmH  C=%.0f\muF  R_{load}=%.0f\Omega', ...
    L*1e3, C*1e6, R_load));

% --- Subplot 2: PI voltage controller step response ---
subplot(3,1,2);
[y, ~] = step(Vm * T_v, t);
plot(t, y, 'b', 'LineWidth', 1.5); hold on;
yline(Vm, 'k--');
xlabel('Time (s)'); ylabel('Voltage (V)');
title(sprintf('PI Voltage Controller  Kp=%.0f Ki=%.0f', Kp_v, Ki_v));
grid on;

si = stepinfo(T_v);
fprintf('Rise time:     %.4f s\n', si.RiseTime);
fprintf('Overshoot:     %.1f %%\n', si.Overshoot);
fprintf('Settling time: %.4f s\n', si.SettlingTime);

% --- Subplot 3: frequency droop for two inverters ---
subplot(3,1,3);
P = 0:0.1:10;
f0 = 50;  Kd1 = 0.1;  Kd2 = 0.2;
plot(P, f0 - Kd1*P, 'b', P, f0 - Kd2*P, 'r--', 'LineWidth', 1.5);
legend(sprintf('Inverter 1  K_d=%.1f', Kd1), sprintf('Inverter 2  K_d=%.1f', Kd2));
xlabel('Active Power (W)'); ylabel('Frequency (Hz)');
title('Frequency Droop Characteristic'); grid on;

% Natural frequency and damping of LC filter
wn = 1/sqrt(L*C);
zeta = 1/(2*R_load) * sqrt(L/C);
fprintf('\nLC filter natural frequency: %.1f Hz\n', wn/(2*pi));
fprintf('LC filter damping ratio:     %.3f\n', zeta);
```

Record the predicted rise time, overshoot, and LC natural frequency before proceeding to the experiments.

---

## MATLAB Comparison

After completing the experiments, enter your measured load regulation data and PI step response to compare against simulation.

```matlab
% --- Enter your system parameters ---
Vm     = 5;       % target peak voltage (V)
L      = 1e-3;    % H
C      = 1e-6;    % F
Kp_v   = 3;
Ki_v   = 100;

% --- Enter measured Vout for each load (Experiment 2) ---
R_loads  = [100, 220, 470];          % Ohm
V_meas   = [4.6, 4.85, 4.95];       % V peak — replace with your readings

% Simulate Vout vs load
s = tf('s');
V_sim = zeros(1, numel(R_loads));
for k = 1:numel(R_loads)
    R = R_loads(k);
    G_lc = R / (L*C*R*s^2 + L*s + R);
    C_pi = Kp_v + Ki_v/s;
    T_v  = feedback(C_pi * G_lc, 1);
    V_sim(k) = Vm * dcgain(T_v);
end

figure;
subplot(2,1,1);
plot(R_loads, V_sim, 'b-o', R_loads, V_meas, 'r-s', 'LineWidth', 1.5);
legend('Simulated','Measured'); grid on;
xlabel('Load Resistance (\Omega)'); ylabel('Output Voltage (V)');
title('Load Regulation: Simulated vs Measured');
yline(Vm, 'k--');

% --- Enter measured PI step response (Experiment 3) ---
t_meas = [0, 0.002, 0.005, 0.010, 0.015, 0.020, 0.030];  % s — replace
v_meas = [0, 1.5,   4.2,   5.3,   5.1,   5.0,   5.0];    % V — replace

R_nom = 220;
G_lc  = R_nom / (L*C*R_nom*s^2 + L*s + R_nom);
C_pi  = Kp_v + Ki_v/s;
T_v   = feedback(C_pi * G_lc, 1);
[y_sim, t_sim] = step(Vm * T_v, 0:1e-5:0.05);

subplot(2,1,2);
plot(t_sim, y_sim, 'b-', 'LineWidth', 1.5); hold on;
plot(t_meas, v_meas, 'ro--', 'MarkerSize', 6);
yline(Vm, 'k--');
legend('Simulated','Measured'); grid on;
xlabel('Time (s)'); ylabel('Voltage (V)');
title(sprintf('PI Voltage Step Response  Kp=%.0f Ki=%.0f', Kp_v, Ki_v));

% --- Metrics ---
reg_pct = abs(V_meas - Vm) ./ Vm * 100;
fprintf('\nVoltage regulation error:\n');
for k = 1:numel(R_loads)
    fprintf('  R=%3d Ohm: sim=%.3fV  meas=%.3fV  error=%.1f%%\n', ...
        R_loads(k), V_sim(k), V_meas(k), reg_pct(k));
end
```

Reflection questions:

1. Does voltage regulation worsen at lower load resistance (higher current)? What physical effect causes this?
2. How does the LC filter natural frequency relate to the PI controller bandwidth? What happens if the controller bandwidth exceeds the filter resonance?
3. How would adding a second inverter with a different droop coefficient change the load-sharing behaviour?

---

## Knowledge Check

### Question 1

What is the primary difference between Grid-Following and Grid-Forming control?

Answer:

```text
____________________
```

---

### Question 2

Why is a PLL unnecessary in a Grid-Forming converter?

Answer:

```text
____________________
```

---

### Question 3

What does the voltage controller regulate?

Answer:

```text
____________________
```

---

### Question 4

What is droop control?

Answer:

```text
____________________
```

---

### Question 5

What is a Virtual Synchronous Machine?

Answer:

```text
____________________
```

---

### Question 6

Your MATLAB simulation predicted less than 1% voltage regulation error across all three loads, but the physical inverter showed 8% error at the 100 Ω load. Identify two physical causes and explain what change to the controller or hardware would reduce the error.

Answer:

```text
____________________
```

---

## Troubleshooting Checklist

✅ SPWM operating correctly

✅ Dead time implemented

✅ H-Bridge switching correctly

✅ LC filter installed

✅ Voltage sensor calibrated

✅ PI controller operating

✅ Output frequency stable

✅ Output voltage regulated

✅ Safe load connection verified

---

## Project Summary

In this project you learned:

✅ Grid-Forming operation

✅ Autonomous AC generation

✅ Voltage regulation

✅ Frequency regulation

✅ SPWM implementation

✅ Droop control

✅ Virtual Synchronous Machines

✅ Microgrid fundamentals

This project combines:

✅ PWM

✅ Inverters

✅ MOSFET Switching

✅ PI Controllers

✅ Power Electronics

✅ System Identification

✅ Controller Design

✅ AC Systems

✅ Renewable Energy Systems

into a complete Grid-Forming Voltage Source Converter architecture.

You have now progressed from:

```text
Basic PWM Generation
```

to:

```text
Autonomous AC Grid Creation
```

using the same fundamental principles employed in modern:

- Battery Energy Storage Systems
- Grid-Forming Inverters
- Standalone Microgrids
- Renewable Energy Plants
- Future Electrical Power Systems
