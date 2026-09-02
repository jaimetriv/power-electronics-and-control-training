# Project 05 - DC Chopper Converters and DC Motor Drives

---

## Objective

In this project you will learn:

- What a chopper converter is
- How PWM creates chopper action
- The relationship between Buck and Boost converters
- DC motor chopper drives
- Average voltage control
- Quadrant operation
- Industrial applications of choppers

This project connects:

```text
Power Electronics  ←→  Motor Drives
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Define a chopper converter

✅ Explain chopper operation

✅ Calculate average output voltage

✅ Explain first-quadrant operation

✅ Measure PWM waveforms

✅ Explain motor speed control using choppers

✅ Relate Buck and Boost converters to choppers

---

## Introduction

A Chopper Converter is a DC-to-DC converter that controls the average value of a DC voltage by rapidly switching a semiconductor device ON and OFF.

---

## Why Is It Called a Chopper?

The input DC voltage is chopped into pulses:

```text
12V ─────      ─────
          │      │
          │      │
0V _______│______│______
```

The average value depends on the duty cycle.

---

## Average Output Voltage

For an ideal step-down chopper:

$$
V_{OUT} = D \cdot V_{IN}
$$

Where:

- $V_{OUT}$ = Output Voltage
- $D$ = Duty Cycle
- $V_{IN}$ = Input Voltage

### Example

Given $V_{IN} = 12\ \text{V}$ and $D = 0.5$:

$$
V_{OUT} = 0.5 \times 12 = 6\ \text{V}
$$

---

## Chopper Versus Linear Control

### Linear Control

```text
Input → Resistor → Output
```

Disadvantages: heat generation, lower efficiency.

### Chopper Control

```text
Input → Switching → Output
```

Advantages: high efficiency, low losses, better performance.

---

## Chopper Classification

### Type A Chopper (Step-Down / Buck)

- Positive voltage
- Positive current
- Output voltage lower than input

### Type B Chopper (Step-Up / Boost)

- Voltage boosting
- Output voltage higher than input

---

## Quadrant Concept

Motor drives are described using torque and speed quadrants:

```text
      Speed

        +
        │
   II   │   I
        │
────────┼────────
        │
   III  │   IV
        │
        -
```

Most microcontroller motor control projects operate in First Quadrant only (positive voltage, positive current), which is sufficient for PWM speed control and Buck converters.

---

## Chopper Controlled Motor Drive

```text
Battery (+)
    │
MOSFET Chopper (PWM controlled)
    │
DC Motor
    │
Battery (−) / GND
```

Motor average voltage:

$$
V_{AVG} = D \cdot V_S
$$

Motor speed is approximately proportional to average voltage.

---

## Simulink Simulation

Before building the circuit, build a Simulink model to predict the chopper waveform and average output voltage at each duty cycle.

This model is signal-only — no Simscape physical network is needed. The chopper output is a PWM waveform; the load averaging is conceptual at this stage.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `DC_Chopper`.

---

### Step 2 — Add Blocks

Open the **Library Browser** and drag the following blocks onto the canvas:

| Block | Library path | Quantity |
|-------|-------------|----------|
| Pulse Generator | Simulink → Sources | 1 |
| Gain | Simulink → Math Operations | 1 |
| Scope | Simulink → Sinks | 1 |

The Gain block will scale the 0–1 pulse to 0–$V_{IN}$.

---

### Step 3 — Configure the Pulse Generator

Double-click the **Pulse Generator** block and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Period | `0.002` |
| Pulse Width | `50` (percent) |
| Phase delay | `0` |

This produces a normalised 0–1 pulse at 500 Hz with 50% duty cycle.

---

### Step 4 — Configure the Gain Block

Double-click the **Gain** block and set:

| Parameter | Value |
|-----------|-------|
| Gain | `3.3` |

This scales the pulse to 0–3.3 V, matching the ESP32 GPIO output.

---

### Step 5 — Wire the Model

Connect:

```text
Pulse Generator → Gain → Scope
```

---

### Step 6 — Simulation Settings

Go to **Modeling → Model Settings** (or press **Ctrl+E**).

Under **Solver**:

| Setting | Value |
|---------|-------|
| Stop time | `0.008` |
| Type | Variable-step |
| Solver | `ode45` |

Click **OK**.

---

### Step 7 — Run and Observe

Click **Run**. Open the Scope.

You should see a 0–3.3 V square wave at 500 Hz with equal ON and OFF times. The average value is $0.5 \times 3.3 = 1.65$ V.

---

### Step 8 — Vary the Duty Cycle

Change the **Pulse Width** parameter in the Pulse Generator and re-run for each duty cycle:

| Pulse Width (%) | Duty Cycle | Expected $V_{AVG}$ |
|-----------------|------------|--------------------|
| 25 | 25% | 0.83 V |
| 50 | 50% | 1.65 V |
| 75 | 75% | 2.48 V |

Observe how the ON time grows and the average voltage rises proportionally.

---

### Step 9 — Unified Converter Comparison (MATLAB Script)

Run this script in the MATLAB Command Window to plot the Type A (Buck) and Type B (Boost) output voltage curves together, showing where the chopper motor drive sits:

```matlab
Vin = 3.3;
D   = 0:0.001:0.95;

figure; hold on;
plot(D, Vin.*D,       'b',  'LineWidth', 2, 'DisplayName', 'Type A (Buck)  V_{OUT}=D\cdotV_{IN}');
plot(D, Vin./(1-D),   'r',  'LineWidth', 2, 'DisplayName', 'Type B (Boost) V_{OUT}=V_{IN}/(1-D)');
yline(Vin, 'k:', sprintf('V_{IN} = %.1fV', Vin));
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('DC Chopper Converters - Unified Comparison');
legend('Location', 'northwest');
ylim([0 20]);
```

Note that the Type A (Buck) curve and the motor chopper $V_{AVG} = D \cdot V_S$ are identical — a motor chopper and a Buck converter share the same voltage-control law.

---

### Wiring Checklist

✅ Pulse Generator output → Gain → Scope

✅ Amplitude = 1, Period = 0.002, Phase delay = 0

✅ Gain = 3.3

✅ Stop time = 0.008, Variable-step, ode45

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Predicted V<sub>AVG</sub> (V)</th><th>Motor speed</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab05-sim-vavg25" placeholder="V"></td><td><input class="result-input" id="lab05-sim-spd25" placeholder="e.g. Slow"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab05-sim-vavg50" placeholder="V"></td><td><input class="result-input" id="lab05-sim-spd50" placeholder="e.g. Medium"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab05-sim-vavg75" placeholder="V"></td><td><input class="result-input" id="lab05-sim-spd75" placeholder="e.g. Fast"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- ESP32 DevKit V1
- Breadboard
- Jumper wires
- Oscilloscope (OWON HDS272S recommended, DSO Nano compatible)

## Experiment 1 - Observe the Chopper Waveform

### Objective

Observe the chopper switching waveform and measure its average voltage at 50% duty cycle.

---

### Connections

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** onto **ESP32 GPIO18**.
3. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

```text
CH1 socket    ◄──── BNC connector
ESP32 GND     ◄──── CH1 probe ground
ESP32 GPIO18  ◄──── CH1 probe tip
```

No breadboard components are needed for this experiment.

---

### ESP32 Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    // Average voltage = 0.5 × V_S ≈ 1.65 V from a 3.3 V supply.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
3.3V ─────      ─────
          │      │
          │      │
0V ________│______│______
```

---

### Observe

The waveform should switch between 0 V and approximately 3.3 V at ~500 Hz with equal ON and OFF times.

---

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>~500 Hz</td><td><input class="result-input" id="lab05-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Duty Cycle</td><td>~50%</td><td><input class="result-input" id="lab05-exp1-duty" placeholder="%"></td></tr>
    <tr><td>Peak Voltage</td><td>~3.3 V</td><td><input class="result-input" id="lab05-exp1-vpeak" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Duty Cycle Investigation

### Objective

Observe how changing duty cycle changes the average output voltage — the fundamental principle of chopper speed control.

---

### ESP32 Code

```cpp
void setup()
{
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through three duty cycles with a 3-second pause at each.
    // Average voltage = D × V_S at each step.

    ledcWrite(0, 64);    // ~25% duty cycle → V_AVG ≈ 0.83 V
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle → V_AVG ≈ 1.65 V
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle → V_AVG ≈ 2.48 V
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Measured V<sub>AVG</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab05-exp2-vavg25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab05-exp2-vavg50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab05-exp2-vavg75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## MATLAB Comparison

Overlay your measured average voltages against the ideal chopper theory.

```matlab
Vin = 3.3;

D_measured    = [0.25,  0.50,  0.75];   % measured duty cycles
Vavg_measured = [0.00,  0.00,  0.00];   % replace with measured average voltages (V)

D_ideal  = 0:0.01:1;
Vavg_ideal = Vin .* D_ideal;

figure; hold on;
plot(D_ideal, Vavg_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', 'Ideal: V_{AVG} = D \cdot V_{IN}');
scatter(D_measured, Vavg_measured, 80, 'r', 'filled', ...
    'DisplayName', 'Measured');
grid on;
xlabel('Duty Cycle'); ylabel('Average Voltage (V)');
title('DC Chopper - Ideal vs Measured');
legend('Location', 'northwest');

fprintf('%-8s %-12s %-12s %-12s\n', 'D', 'V_ideal(V)', 'V_meas(V)', 'Error(%)');
for i = 1:3
    V_ideal = Vin * D_measured(i);
    err     = 100 * abs(V_ideal - Vavg_measured(i)) / V_ideal;
    fprintf('%-8.2f %-12.3f %-12.3f %-12.1f\n', ...
        D_measured(i), V_ideal, Vavg_measured(i), err);
end
```

### Consolidation Plot — All Three Topologies

```matlab
Vin = 3.3;
D   = 0:0.001:0.95;

% Replace with your measured values from the Results Table above
D_measured    = [0.25, 0.50, 0.75];
Vavg_measured = [0.00, 0.00, 0.00];   % (V)

figure; hold on;
plot(D, Vin.*D,          'b',  'LineWidth', 2, 'DisplayName', 'Type A Buck');
plot(D, Vin./(1-D),      'r',  'LineWidth', 2, 'DisplayName', 'Type B Boost');
scatter(D_measured, Vavg_measured, 80, 'gs', 'filled', ...
    'DisplayName', 'Measured (Chopper)');
yline(Vin, 'k:', 'V_{IN}');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck / Boost / Chopper - Unified View');
legend('Location', 'northwest');
ylim([0 20]);
```

### Reflection

- Do your measured average voltages fall on the ideal line?
- The Type A (Buck) and motor chopper curves are identical. What does this tell you about the relationship between a Buck Converter and a DC motor drive?
- Why does the Type B (Boost) curve diverge rapidly from the Type A curve as D increases?

---

## Troubleshooting

### No PWM Visible

Check:

✅ Probe tip on GPIO18

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for ~500 Hz)

---

### Average Voltage Not Matching Theory

Check:

✅ Duty cycle measured correctly from oscilloscope

✅ Supply voltage measured with multimeter

✅ Probe attenuation setting matches probe switch

---

### Troubleshooting Checklist

✅ Controller powered and sketch uploaded

✅ Probe on PWM pin

✅ Probe ground on GND

✅ Trigger enabled

✅ Correct time scale selected

---

## Knowledge Check

### Question 1

What is a chopper converter?

---

### Question 2

Why is PWM used in choppers?

---

### Question 3

What type of chopper is a Buck Converter?

---

### Question 4

What determines the average output voltage?

---

### Question 5

Why are chopper converters efficient?

---

### Question 6

A DC motor drive and a Buck Converter both use the equation $V_{AVG} = D \times V_S$. Explain one key circuit difference between them that makes the Buck Converter suitable for powering sensitive electronics while the basic motor chopper is not.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab05">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab05">✕ Clear All Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ Chopper converter fundamentals

✅ PWM-based voltage control

✅ Buck and Boost chopper relationships

✅ DC motor drive concepts

✅ Average voltage control

✅ First-quadrant operation

✅ Industrial power electronics terminology

---

## Next Project

```text
06_Buck_Converter.md
```

Topics:

- Buck Converter Fundamentals
- MOSFET Switching
- Inductor Energy Storage
- Output Voltage Control
- Ripple Voltage
