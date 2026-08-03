# Project 08 - Buck Converter Fundamentals

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_AC_DC_Rectifiers.md
- 06_DC_AC_Inverters.md
- 07_DC_Chopper_Converters.md

---

## Objective

In this project you will learn:

- What a Buck Converter is
- How a Buck Converter reduces voltage
- How PWM controls output voltage
- The role of the MOSFET
- The role of the inductor
- The role of the capacitor
- The role of the freewheel diode
- How energy is transferred in switched-mode power supplies
- How to measure converter waveforms using the OWON HDS272S oscilloscope

This project combines concepts from PWM, RC Circuits, RLC Circuits, MOSFET Switching, and Control Theory, and forms the foundation of modern power electronics.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Buck Converter operation

✅ Explain inductor energy storage

✅ Explain capacitor filtering

✅ Calculate ideal output voltage

✅ Measure PWM switching signals

✅ Measure output ripple

✅ Understand duty-cycle control

✅ Relate converter operation to previous projects

---

## Introduction

A Buck Converter is a DC-to-DC converter that reduces voltage.

Examples:

```text
12 V → 5 V

24 V → 12 V

48 V → 24 V
```

Unlike resistor-based voltage reduction, a Buck Converter operates with very high efficiency.

---

## Why Not Use a Resistor?

A resistor can reduce voltage, but energy is dissipated as heat.

Power loss:

$$
P = V \cdot I
$$

As current increases, the power loss also increases.

---

## Why Buck Converters Are Efficient

Buck Converters use fast switching instead of continuous dissipation.

The MOSFET is usually either fully ON or fully OFF, which minimises power loss.

---

## Circuit Diagram

```text
5 V Supply
    │
   MOSFET (IRLZ44N)
    │
   Inductor (100 µH)
    │
    ├──── Vout ──── Probe Tip
    │         │
   Diode    100 µF capacitor
(1N5819)      │
    │         │
   GND ───────┴──── Probe GND
```

---

## Main Components

A basic Buck Converter contains:

1. MOSFET — high-speed electronic switch
2. Diode — freewheel path for inductor current
3. Inductor — stores energy in a magnetic field
4. Capacitor — smooths the output voltage
5. Load

---

## Role of the MOSFET

The MOSFET acts as a high-speed electronic switch.

The controller generates PWM which controls the average energy transfer from input to output.

---

## Role of the Inductor

The inductor stores energy in a magnetic field:

$$
E = \frac{1}{2}LI^2
$$

When the MOSFET switches OFF, the inductor attempts to keep current flowing — this is one of the key principles behind Buck Converter operation.

---

## Role of the Capacitor

The capacitor smooths the output voltage:

$$
E = \frac{1}{2}CV^2
$$

The capacitor reduces output voltage ripple.

---

## Role of the Diode

When the MOSFET turns OFF, inductor current must continue flowing.

The diode provides an alternative path called the:

```text
Freewheel Path
```

A Schottky diode (1N5819) is preferred because its lower forward voltage drop improves efficiency.

---

## Ideal Buck Converter Equation

$$
V_{OUT} = D \cdot V_{IN}
$$

Where:

- $V_{OUT}$ = Output Voltage
- $V_{IN}$ = Input Voltage
- $D$ = Duty Cycle

### Example 1

$V_{IN} = 12\ \text{V}$, $D = 0.5$:

$$
V_{OUT} = 0.5 \times 12 = 6\ \text{V}
$$

### Example 2

$V_{IN} = 12\ \text{V}$, $D = 0.25$:

$$
V_{OUT} = 0.25 \times 12 = 3\ \text{V}
$$

---

## Operating Principle

### MOSFET ON

Current path:

```text
Input → MOSFET → Inductor → Output
```

The inductor stores energy.

### MOSFET OFF

Current path:

```text
Inductor → Diode → Output
```

Stored magnetic energy continues supplying current to the load.

---

## MATLAB Simulation

Before building the circuit, simulate the ideal Buck Converter behaviour to predict what you will measure.

### Vout vs Duty Cycle — 5 V Supply

```matlab
Vin = 3.3;
D   = 0:0.01:1;
Vout_ideal = D .* Vin;

D_exp    = [0.25, 0.50, 0.75];
Vout_exp = D_exp .* Vin;

figure;
plot(D, Vout_ideal, 'b', 'LineWidth', 2); hold on;
scatter(D_exp, Vout_exp, 80, 'r', 'filled', 'DisplayName', 'Experiment points');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Ideal Buck Converter - V_{IN} = 5V');
legend('Ideal V_{OUT} = D \cdot V_{IN}', 'Experiment points', 'Location', 'northwest');
```

### Simulate Inductor Current Waveform

```matlab
Vin  = 3.3;
D    = 0.5;
Vout = D * Vin;
L    = 100e-6;
fsw  = 500;
Ts   = 1 / fsw;
Iavg = 0.05;

delta_iL = (Vin - Vout) * D * Ts / L;

t_on  = linspace(0,      D*Ts,    100);
t_off = linspace(D*Ts,   Ts,      100);

iL_on  = (Iavg - delta_iL/2) + (Vin - Vout)/L .* t_on;
iL_off = (Iavg + delta_iL/2) - Vout/L .* (t_off - D*Ts);

figure;
plot([t_on, t_off]*1e3, [iL_on, iL_off]*1e3, 'b', 'LineWidth', 2);
grid on;
xlabel('Time (ms)'); ylabel('Inductor Current (mA)');
title(sprintf('Inductor Current Ripple - D=%.0f%%, L=%d\muH, f_{sw}=%dHz', ...
    D*100, L*1e6, fsw));
yline(Iavg*1e3, 'r--', sprintf('I_{avg} = %.0f mA', Iavg*1e3));
```

### Prediction Table

| PWM Value | Duty Cycle | Predicted V\_{OUT} (V) |
|-----------|------------|------------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

## Components Required

- IRLZ44N MOSFET
- 1N5819 Schottky Diode
- 100 µH Inductor
- 100 µF Electrolytic Capacitor
- 220 Ω gate resistor
- ESP32 DevKit V1
- Breadboard and jumper wires
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Safety Notice

For this introductory project use the **ESP32 3.3 V supply** rather than an external 12 V supply.

This reduces the risk of component damage while learning.

If using ESP32 gate drive (~3.3 V), use a logic-level MOSFET with low $R_{DS(on)}$ specified at low $V_{GS}$, or use a gate driver.

---

## Experiment 1 - Generate the Switching Signal

### Objective

Upload the PWM code and observe the gate switching signal on the oscilloscope before connecting the full converter circuit.

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

No breadboard components needed — verify the gate signal before building the full converter.

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
    // This is the switching signal that will drive the MOSFET gate.
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
3.3V  ─────      ─────
           │    │
           │    │
0V    _____│____│_____
```

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | ~500 Hz | |
| Duty Cycle | ~50% | |
| Gate Voltage | ~3.3 V | |

---

## Experiment 2 - Build the Buck Converter and Vary Duty Cycle

### Objective

Build the full converter circuit and observe how duty cycle controls output voltage.

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET** into the breadboard. Identify Gate (G), Drain (D), and Source (S) from the pinout (see Project 04).
2. Connect a jumper wire from **ESP32 GND** to the **MOSFET Source** row.
3. Insert the **220 Ω gate resistor** so one leg is in the **Gate** row and the other is in a new row.
4. Connect a jumper wire from **ESP32 GPIO18** to the top of the gate resistor.
5. Connect a jumper wire from **ESP32 3.3V** to the **MOSFET Drain** row. This is the converter input.
6. Insert the **100 µH inductor** so one leg is in the **MOSFET Drain** row and the other is in a new row below. This junction is the switch node.
7. Insert the **1N5819 diode** so its **cathode (banded end)** is in the switch node row and its **anode** is in the GND row. This is the freewheel diode.
8. Insert the **100 µF capacitor** so its **positive leg** is in the lower inductor leg row (Vout) and its **negative leg** is in the GND row.
9. Connect a jumper wire from the **lower inductor leg** row to a load resistor (optional — the capacitor alone is sufficient for initial testing).
10. Hook the **CH1 probe tip** to the Vout node (lower inductor leg / capacitor positive).
11. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

The signal path will be:

```text
5V → MOSFET Drain → MOSFET Source (when ON)
                  ↓
             Switch Node
                  │
             Inductor
                  │
                Vout ──── Capacitor ──── GND
                  │
             Diode (cathode at switch node, anode at GND)
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND

✅ MOSFET Drain connected to 5V supply

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Inductor between MOSFET Drain and Vout node

✅ Diode cathode at switch node (MOSFET Drain side), anode at GND

✅ Capacitor positive leg at Vout, negative leg at GND

✅ CH1 probe tip at Vout, CH1 probe ground at ESP32 GND

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
    // Expected Vout = D × Vin at each step.

    ledcWrite(0, 64);    // ~25% duty cycle → Vout ≈ 0.83 V
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle → Vout ≈ 1.65 V
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle → Vout ≈ 2.48 V
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Oscilloscope Settings — Output Voltage

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 1 s/div | 1 s/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

The output voltage should step between three levels as the code cycles through duty cycles.

Measure the average DC output at each step with a multimeter or the oscilloscope DC measurement.

---

### Results Table

| PWM Value | Duty Cycle | Expected V\_{OUT} | Measured V\_{OUT} |
|-----------|------------|-------------------|-------------------|
| 64 | 25% | 0.83 V | |
| 128 | 50% | 1.65 V | |
| 192 | 75% | 2.48 V | |

---

## Experiment 3 - Observe Output Ripple

### Objective

Measure the output voltage ripple at the switching frequency.

---

### Connections

1. Hook the **CH1 probe tip** to the **Vout node** (lower inductor leg / capacitor positive).
2. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

> Use AC coupling to isolate the ripple from the DC offset.

---

### Oscilloscope Settings — Ripple

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 200 mV/div | 200 mV/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

> Switch to AC coupling to zoom in on the ripple while ignoring the DC offset.

---

### Expected Observation

The output should not be perfectly DC.

You should observe a small ripple at the switching frequency:

```text
DC Output
~~~~~~~~~
Small Ripple
~~~~~~~~~
```

---

### Observe

The ripple should be relatively small compared to the average output voltage.

Record the peak-to-peak ripple voltage.

---

### How Can Ripple Be Reduced?

- Increasing capacitance
- Increasing inductance
- Increasing switching frequency
- Reducing load current variations

---

## MATLAB Comparison

Overlay your measured output voltages against the ideal theory line.

```matlab
Vin = 3.3;

D_measured    = [0.25,  0.50,  0.75];
Vout_measured = [0.00,  0.00,  0.00];   % replace with your measured voltages (V)

D_ideal  = 0:0.01:1;
Vout_ideal = D_ideal .* Vin;

figure; hold on;
plot(D_ideal, Vout_ideal, 'b--', 'LineWidth', 2, 'DisplayName', 'Ideal: V_{OUT} = D \cdot V_{IN}');
scatter(D_measured, Vout_measured, 80, 'r', 'filled', 'DisplayName', 'Measured');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck Converter - Ideal vs Measured');
legend('Location', 'northwest');

fprintf('%-8s %-12s %-12s %-12s\n', 'D', 'V_ideal(V)', 'V_meas(V)', 'Drop(V)');
for i = 1:3
    V_ideal = D_measured(i) * Vin;
    drop    = V_ideal - Vout_measured(i);
    fprintf('%-8.2f %-12.3f %-12.3f %-12.3f\n', D_measured(i), V_ideal, Vout_measured(i), drop);
end
```

### Reflection

- Is the measured Vout lower than the ideal prediction? Why? (MOSFET $V_{DS(on)}$, diode forward voltage drop, inductor DCR)
- Is the voltage drop consistent across all three duty cycles, or does it change?
- How would using a Schottky diode (lower forward voltage) improve the result compared to a standard 1N4007?

---

## Troubleshooting

### No Output Voltage

Check:

✅ MOSFET pinout correct (G, D, S identified)

✅ Diode polarity (cathode banded end toward switch node / 5V side)

✅ Inductor connected between MOSFET Drain and Vout

✅ Shared GND between ESP32 and converter

---

### Excessive Ripple

Check:

✅ Capacitor value (100 µF)

✅ Capacitor polarity (positive leg to Vout)

✅ Load not drawing excessive current

---

### No PWM Signal at Gate

Check:

✅ Gate resistor connected between GPIO18 and MOSFET Gate

✅ Code uploaded successfully

✅ CH1 probe tip on MOSFET Gate, CH1 probe ground on ESP32 GND

---

### Troubleshooting Checklist

✅ PWM present at MOSFET gate

✅ Diode polarity verified

✅ Inductor connected correctly

✅ Capacitor polarity verified

✅ Output voltage measured

✅ Output ripple visible

✅ Duty cycle affects output voltage

---

## Knowledge Check

### Question 1

Write the ideal Buck Converter equation.

---

### Question 2

What is the role of the inductor?

---

### Question 3

What is the role of the capacitor?

---

### Question 4

Why are Buck Converters efficient?

---

### Question 5

What causes output ripple?

---

### Question 6

Your simulation predicted Vout = 2.5 V at 50% duty cycle but you measured 2.1 V. The MOSFET has $V_{DS(on)}$ = 0.1 V and the 1N5819 has a forward voltage of 0.3 V. Show how these account for the 0.4 V discrepancy.

---

## Project Summary

In this project you learned:

✅ Buck Converter fundamentals

✅ PWM voltage control

✅ MOSFET switching

✅ Inductor energy storage

✅ Capacitor filtering

✅ Output ripple

✅ Converter efficiency

✅ Practical switched-mode power electronics

---

## Next Project

```text
15_Closed_Loop_Buck.md
```

Topics:

- Voltage Feedback
- PI Regulation
- Closed-Loop Control
- Converter Dynamics
- Stability
- Disturbance Rejection
