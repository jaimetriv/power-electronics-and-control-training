# Project 18 - Grid-Forming Voltage Source Converter (VSC)

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 06_Buck_Converter.md
- 15_Closed_Loop_Buck.md
- 07_Boost_Converter.md
- 05_DC_Chopper_Converters.md
- 09_AC_DC_Rectifiers.md
- 10_DC_AC_Inverters.md
- 11_System_Identification.md
- 16_Controller_Design.md
- 17_Grid_Following_VSC.md

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

## Introduction

Project 17 introduced Grid-Following Converters.

Those converters require an existing grid — they measure voltage and inject current.

A Grid-Forming converter instead creates its own voltage, frequency, and phase.

---

## Grid-Following versus Grid-Forming

| Feature | Grid-Following | Grid-Forming |
|---------|--------------|--------------|
| PLL Required | Yes | No |
| Existing Grid Required | Yes | No |
| Controls Current | Yes | Usually |
| Controls Voltage | No | Yes |
| Controls Frequency | No | Yes |
| Black Start | No | Yes |
| Islanded Operation | No | Yes |

---

## Complete System Architecture

```text
Voltage Reference
        │
        ▼
Frequency Generator (internal oscillator)
        │
        ▼
PI Voltage Controller
        │
        ▼
Modulation Index
        │
        ▼
SPWM Generator
        │
        ▼
H-Bridge (4 × IRLZ44N + IR2104 driver)
        │
        ▼
LC Filter
        │
        ▼
Load
        ▲
        │
Voltage Sensor (resistor divider → ADC)
        │
        └──────── Feedback
```

---

## Hardware Requirements

### Controller

```text
ESP32 DevKit V1  (recommended)
STM32 Nucleo     (alternative)
Arduino Mega     (alternative)
```

### Inverter Stage

- 4 × IRLZ44N MOSFETs
- IR2104 gate driver (recommended) or IR2110

### Sensors

- Voltage measurement: resistor divider
- Current measurement: ACS712 or ACS758

### LC Filter

- Inductor: 1 mH to 5 mH
- Capacitor: 1 µF film capacitor

### Test Equipment

- OWON HDS272S (recommended)
- DSO Nano (compatible)
- Multimeter
- 12 V bench power supply

---

## Complete Materials List

```text
ESP32 DevKit V1
IR2104 Gate Driver
4 × IRLZ44N MOSFETs
ACS712 Current Sensor
1 mH Inductor
1 µF Film Capacitor
470 µF Electrolytic Capacitor (DC link)
100 nF Ceramic Capacitor (DC link decoupling)
12 V Bench Supply
OWON HDS272S (or DSO Nano)
Breadboard and Jumper Wires
Multimeter
```

---

## Full H-Bridge Schematic

```text
              +Vdc (12 V)
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

Turn ON Q1 and Q4.

Current flows:

```text
+Vdc → Q1 → Load → Q4 → GND
```

### Negative Half-Cycle

Turn ON Q2 and Q3.

Current flows in the opposite direction.

---

## Shoot-Through Warning

Never enable Q1 and Q3 simultaneously.

Never enable Q2 and Q4 simultaneously.

This creates a direct supply short circuit.

---

## Dead Time

A delay is inserted between switching events to prevent shoot-through.

Typical values:

```text
1 µs to 5 µs
```

---

## DC Link Circuit

Every practical inverter requires a DC-link capacitor mounted near the MOSFET bridge:

```text
+12 V Supply
      │
 470 µF Electrolytic  +  100 nF Ceramic  (in parallel)
      │
H-Bridge
```

---

## LC Output Filter

The H-Bridge output contains PWM ripple.

An LC filter smooths the waveform:

```text
H-Bridge
    │
    L (1 mH)
    │
    ├──── Load
    │
    C (1 µF)
    │
   GND
```

---

## Voltage Measurement Circuit

The ESP32 must never measure the inverter voltage directly.

Use a resistor divider to scale the output to the ADC range:

```text
Output Voltage
      │
    47 kΩ
      │──── ADC (ESP32 GPIO34)
    10 kΩ
      │
     GND
```

---

## Voltage Reference

The inverter generates:

$$
v^*(t) = V_m \sin(\omega t)
$$

Where:

- $V_m$ = Desired Peak Voltage
- $\omega = 2\pi f$ = Angular Frequency

No PLL is required — the inverter generates its own electrical angle:

$$
\theta = \omega t
$$

---

## Digital SPWM Implementation

```cpp
// Update angle each sample period
theta += omega * Ts;

// Wrap angle to keep within 0 to 2π
if (theta > 2 * PI)
{
    theta -= 2 * PI;
}

// Generate sine reference
float reference = sin(theta);

// Convert to PWM duty cycle (0–255)
int pwm = (int)(127 + 127 * reference);
pwm = constrain(pwm, 0, 255);
```

Where:

- `theta` = Electrical Angle
- `omega` = Angular Frequency ($2\pi \times 50$)
- `Ts` = Sampling Time
- `reference` = Sine Reference
- `pwm` = PWM Duty Cycle

---

## Voltage Control Loop

```text
Voltage Reference → [−] → PI Controller → Modulation Index → SPWM → Inverter → Output Voltage
                       ↑                                                               │
                       └──────────────────── Voltage Sensor ──────────────────────────┘
```

---

## PI Voltage Controller

$$
u = K_P e + K_I \int e\,dt
$$

The PI controller removes steady-state error, improves regulation, and compensates for load changes.

---

## Droop Control

Grid-Forming converters often emulate synchronous generators using droop control.

### Active Power Droop

$$
f = f_0 - K_P(P - P_0)
$$

### Reactive Power Droop

$$
V = V_0 - K_Q(Q - Q_0)
$$

Droop allows multiple inverters to share loads automatically without communication.

---

## Virtual Synchronous Machine (VSM)

A Virtual Synchronous Machine emulates the behaviour of a rotating generator using software.

Benefits:

✅ Synthetic Inertia

✅ Better Frequency Stability

✅ Improved Dynamic Response

✅ Enhanced Microgrid Performance

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

## Recommended Build Stages

### Stage 1

Generate a 50 Hz reference signal.

Verify frequency and amplitude on the oscilloscope.

### Stage 2

Generate SPWM.

Verify PWM carrier frequency and varying duty cycle.

### Stage 3

Build and test the H-Bridge.

Verify alternating output voltage.

### Stage 4

Install the LC Filter.

Verify smooth AC voltage output.

### Stage 5

Implement voltage measurement.

Verify ADC accuracy against multimeter reading.

### Stage 6

Implement PI voltage control.

Verify stable regulation.

### Stage 7

Implement droop control.

Study power-sharing behaviour.

---

## Experiment 1 - Generate AC Voltage

### Objective

Generate a stable 50 Hz AC voltage waveform from the inverter.

---

### Connections

```text
Probe Tip  ──────► Inverter output (after LC filter)
Probe GND  ──────► Circuit GND
```

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Measurements

| Parameter | Measured |
|-----------|---------|
| Frequency | |
| RMS Voltage | |
| Peak Voltage | |

---

## Experiment 2 - Load Regulation

### Objective

Observe how output voltage changes with different load resistances, with and without the PI voltage controller.

---

### Test Loads

```text
100 Ω

220 Ω

470 Ω
```

For each load, measure the output voltage with the PI controller active.

---

### Results Table

| Load | Output Voltage |
|------|---------------|
| 100 Ω | |
| 220 Ω | |
| 470 Ω | |

---

## Experiment 3 - PI Tuning

### Objective

Observe how PI gains affect voltage regulation quality.

---

### Procedure

Step through the following gain sets and record the behaviour:

| Kp | Ki | Behaviour |
|----|----|-----------|
| 1 | 10 | |
| 3 | 100 | |
| 10 | 500 | |

Measure for each:

- Overshoot
- Settling time
- Voltage regulation error
- Stability

---

## MATLAB Comparison

After completing the experiments, enter your measured load regulation data and PI step response to compare against simulation.

```matlab
% Enter your system parameters
Vm     = 5;
L      = 1e-3;
C      = 1e-6;
Kp_v   = 3;
Ki_v   = 100;

% Enter measured Vout for each load (Experiment 2)
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

% Enter measured PI step response (Experiment 3)
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

% Metrics
reg_pct = abs(V_meas - Vm) ./ Vm * 100;
fprintf('\nVoltage regulation error:\n');
for k = 1:numel(R_loads)
    fprintf('  R=%3d Ohm: sim=%.3fV  meas=%.3fV  error=%.1f%%\n', ...
        R_loads(k), V_sim(k), V_meas(k), reg_pct(k));
end
```

### Reflection

1. Does voltage regulation worsen at lower load resistance (higher current)? What physical effect causes this?
2. How does the LC filter natural frequency relate to the PI controller bandwidth? What happens if the controller bandwidth exceeds the filter resonance?
3. How would adding a second inverter with a different droop coefficient change the load-sharing behaviour?

---

## Troubleshooting

### SPWM Not Operating Correctly

Check:

✅ Angle increment `omega * Ts` correct for 50 Hz

✅ PWM output pin configured correctly

✅ Oscilloscope showing varying pulse widths

---

### H-Bridge Not Switching

Check:

✅ Dead time implemented

✅ Gate driver supply voltage correct

✅ MOSFET pinout correct (G, D, S)

---

### Output Voltage Unstable

Check:

✅ PI gains not too large

✅ LC filter installed

✅ Voltage sensor calibrated

---

### Troubleshooting Checklist

✅ SPWM operating correctly

✅ Dead time implemented

✅ H-Bridge switching correctly

✅ LC filter installed

✅ Voltage sensor calibrated

✅ PI controller operating

✅ Output frequency stable at 50 Hz

✅ Output voltage regulated

✅ Safe load connection verified

---

## Knowledge Check

### Question 1

What is the primary difference between Grid-Following and Grid-Forming control?

---

### Question 2

Why is a PLL unnecessary in a Grid-Forming converter?

---

### Question 3

What does the voltage controller regulate?

---

### Question 4

What is droop control?

---

### Question 5

What is a Virtual Synchronous Machine?

---

### Question 6

Your MATLAB simulation predicted less than 1% voltage regulation error across all three loads, but the physical inverter showed 8% error at the 100 Ω load. Identify two physical causes and explain what change to the controller or hardware would reduce the error.

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
