# Project 07 - DC Chopper Converters and DC Motor Drives

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 08_Buck_Converter.md
- 15_Closed_Loop_Buck.md
- 09_Boost_Converter.md

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

## MATLAB Simulation

Before building the circuit, simulate the chopper waveforms and unified converter comparison.

### Unified Chopper Comparison

```matlab
Vin = 5;
D   = 0:0.001:0.95;

Vout_typeA = Vin .* D;              % Type A: step-down (Buck)
Vout_typeB = Vin ./ (1 - D);        % Type B: step-up (Boost)
Vavg_motor = Vin .* D;              % Chopper motor drive (same as Type A)

figure; hold on;
plot(D, Vout_typeA, 'b',  'LineWidth', 2, 'DisplayName', 'Type A (Buck)  V_{OUT}=D\cdotV_{IN}');
plot(D, Vout_typeB, 'r',  'LineWidth', 2, 'DisplayName', 'Type B (Boost) V_{OUT}=V_{IN}/(1-D)');
plot(D, Vavg_motor, 'g--','LineWidth', 1.5,'DisplayName', 'Motor Drive    V_{AVG}=D\cdotV_S');
yline(Vin, 'k:', sprintf('V_{IN} = %.0fV', Vin));
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('DC Chopper Converters - Unified Comparison (V_{IN}=5V)');
legend('Location', 'northwest');
ylim([0 20]);
```

### Simulate Chopper Waveform at Each Duty Cycle

```matlab
Vin = 5;
fsw = 490;
Ts  = 1 / fsw;
duty_cycles = [0.25, 0.50, 0.75];
t = 0:1e-6:4*Ts;

figure;
for i = 1:3
    D   = duty_cycles(i);
    pwm = Vin * double(mod(t, Ts) < D * Ts);
    subplot(3,1,i);
    plot(t*1e3, pwm, 'b', 'LineWidth', 1.5); hold on;
    yline(Vin*D, 'r--', sprintf('V_{AVG}=%.2fV', Vin*D));
    ylim([-0.5, 6]); grid on;
    ylabel('V (V)');
    title(sprintf('D = %d%%  \rightarrow  V_{AVG} = %.2fV', D*100, Vin*D));
end
xlabel('Time (ms)');
sgtitle('Chopper Waveforms - 490 Hz, V_{IN}=5V');
```

### Prediction Table

| PWM Value | Duty Cycle | Predicted V\_{AVG} (V) | Motor speed |
|-----------|------------|------------------------|-------------|
| 64 | 25% | | |
| 128 | 50% | | |
| 192 | 75% | | |

---

## Components Required

- Arduino Uno or ESP32 DevKit V1
- Breadboard
- Jumper wires
- Oscilloscope (OWON HDS272S recommended, DSO Nano compatible)

---

## Experiment 1 - PWM Chopper Waveform

### Objective

Observe the chopper switching waveform and measure its average voltage at 50% duty cycle.

---

### Connections

```text
Probe Tip  ──────► Arduino Pin D9  (or ESP32 GPIO18)
Probe GND  ──────► Arduino GND
```

No breadboard components are needed for this experiment.

---

### Arduino Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Output 50% duty cycle PWM — this is the chopper switching signal.
    // Average voltage = 0.5 × V_S ≈ 2.5 V from a 5 V supply.
    analogWrite(9, 128);
}
```

### ESP32 Equivalent Code

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
    ledcWrite(0, 128);
}
```

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
5V ─────      ─────
         │      │
         │      │
0V ______│______│______
```

---

### Observe

The waveform should switch between 0 V and approximately 5 V at ~490 Hz with equal ON and OFF times.

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | ~490 Hz | |
| Duty Cycle | ~50% | |
| Peak Voltage | ~5 V (Arduino) / ~3.3 V (ESP32) | |

---

## Experiment 2 - Duty Cycle Investigation

### Objective

Observe how changing duty cycle changes the average output voltage — the fundamental principle of chopper speed control.

---

### Code

```cpp
void setup() {}

void loop()
{
    // Step through three duty cycles with a 3-second pause at each.
    // Average voltage = D × V_S at each step.

    analogWrite(9, 64);    // ~25% duty cycle → V_AVG ≈ 1.25 V
    delay(3000);

    analogWrite(9, 128);   // ~50% duty cycle → V_AVG ≈ 2.5 V
    delay(3000);

    analogWrite(9, 192);   // ~75% duty cycle → V_AVG ≈ 3.75 V
    delay(3000);
}
```

---

### Results Table

| PWM Value | Duty Cycle | Measured V\_{AVG} |
|-----------|------------|------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

## MATLAB Comparison

Overlay your measured average voltages against the ideal chopper theory.

```matlab
Vin = 5;

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
Vin = 5;
D   = 0:0.001:0.95;

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

✅ Probe tip on correct pin (D9 Arduino or GPIO18 ESP32)

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for ~490 Hz)

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
05_AC_DC_Rectifiers.md
```

Topics:

- AC and DC Fundamentals
- Half-Wave Rectification
- Bridge Rectifiers
- Capacitor Smoothing
- Ripple Voltage
