# Project 06 - DC-AC Inverters and AC Generation

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_AC_DC_Rectifiers.md

---

## Objective

In this project you will learn:

- What an inverter is
- Why inverters are important
- How DC can be converted into AC
- What an H-Bridge is
- How MOSFETs are used in inverter circuits
- What square-wave inverters are
- What PWM inverters are
- The basics of Sinusoidal PWM (SPWM)

This project completes the three major categories of power conversion:

```text
AC → DC

DC → DC

DC → AC
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain inverter operation

✅ Explain H-Bridge circuits

✅ Generate AC from DC

✅ Measure inverter waveforms

✅ Explain square-wave inverters

✅ Explain PWM inverters

✅ Understand SPWM fundamentals

✅ Explain dead time and shoot-through

---

## Introduction

An inverter converts:

```text
Direct Current (DC)  →  Alternating Current (AC)
```

Examples:

```text
12 V DC → 230 V AC

24 V DC → 230 V AC

48 V DC → 230 V AC
```

The actual output voltage depends on the inverter design and transformer ratio.

---

## Why Are Inverters Important?

Many electrical energy sources naturally produce DC power:

- Batteries
- Solar Panels
- Fuel Cells

Many loads require AC power:

- Motors
- Appliances
- Industrial Equipment
- Utility Grids

Therefore:

```text
DC Source → Inverter → AC Output
```

---

## What Is an H-Bridge?

An H-Bridge is the most common inverter topology.

It uses four switches to reverse the voltage across a load.

```text
      +V

    S1    S2
     │    │
     +────+
     │LOAD│
     +────+
     │    │
    S3    S4

      GND
```

The arrangement resembles the letter H, hence the name.

---

## H-Bridge States

### State A — S1 and S4 ON

Current flows left to right through the load.

Load voltage is positive.

### State B — S2 and S3 ON

Current flows right to left through the load.

Load voltage is negative.

Alternating between State A and State B creates an AC output waveform.

---

## Shoot-Through

Never turn ON S1 and S3 simultaneously.

Never turn ON S2 and S4 simultaneously.

This creates a direct short circuit across the supply, called:

```text
Shoot-Through
```

---

## Dead Time

Practical inverters introduce a small delay between switching transitions called:

```text
Dead Time
```

Dead time prevents shoot-through and protects the switching devices.

---

## Square-Wave Inverter Output

```text
+V  ________        ________
           │        │
           │        │
-V ________|________|________
```

The polarity reverses periodically, creating AC.

---

## Sinusoidal PWM (SPWM)

Modern inverters use Sinusoidal PWM rather than pure square waves.

A sinewave reference is compared against a high-frequency carrier waveform.

The resulting PWM pulses vary in width according to the sinewave.

The average voltage follows a sinusoidal shape.

After passing through a filter:

```text
SPWM → Filter → Approximate Sine Wave
```

---

## MATLAB Simulation

Before building the circuit, simulate the three inverter waveform types and compare their harmonic content.

### Square Wave, SPWM and Filtered Output

```matlab
f_out = 50;           % output frequency (Hz)
f_sw  = 2000;         % SPWM carrier frequency (Hz)
t     = 0:1e-5:0.06;

% Ideal sine wave reference
v_sine = sin(2*pi*f_out*t);

% Square wave inverter output
v_square = sign(v_sine);

% SPWM: compare sine reference against triangular carrier
Ts_sw    = 1 / f_sw;
carrier  = 2*abs(mod(t, Ts_sw)/Ts_sw - 0.5) - 0.5;
v_spwm   = sign(v_sine - carrier);

% Simulate LC filter on SPWM output
L = 1e-3; C = 10e-6;
G_filt = tf(1, [L*C, 0, 1]);
[v_filt, ~] = lsim(G_filt, v_spwm, t);

figure;
subplot(4,1,1); plot(t*1e3, v_sine,   'b', 'LineWidth',1.5); grid on;
ylabel('V'); title('Reference Sine Wave (50 Hz)');
subplot(4,1,2); plot(t*1e3, v_square, 'r', 'LineWidth',1.5); grid on;
ylabel('V'); title('Square Wave Inverter Output');
subplot(4,1,3); plot(t*1e3, v_spwm,   'g', 'LineWidth',1); grid on;
ylabel('V'); title(sprintf('SPWM Output (f_{sw}=%d Hz)', f_sw));
subplot(4,1,4); plot(t*1e3, v_filt,   'm', 'LineWidth',2); hold on;
plot(t*1e3, v_sine, 'b--', 'LineWidth',1); grid on;
ylabel('V'); title('Filtered SPWM \approx Sine Wave');
xlabel('Time (ms)');
sgtitle('Inverter Waveform Comparison');
```

### Harmonic Spectrum — Square Wave vs Sine Wave

```matlab
fs = 1/1e-5;
N  = length(t);

F_sq   = abs(fft(v_square)) / N;
F_sine = abs(fft(v_sine))   / N;
freqs  = (0:N-1) * fs / N;

figure;
subplot(2,1,1);
stem(freqs(1:500), F_sq(1:500)*2, 'r', 'filled', 'MarkerSize', 3);
xlabel('Frequency (Hz)'); ylabel('Amplitude');
title('Square Wave - Harmonic Spectrum');
grid on; xlim([0 1000]);

subplot(2,1,2);
stem(freqs(1:500), F_sine(1:500)*2, 'b', 'filled', 'MarkerSize', 3);
xlabel('Frequency (Hz)'); ylabel('Amplitude');
title('Sine Wave - Harmonic Spectrum');
grid on; xlim([0 1000]);
```

### Prediction Table

| Waveform | Fundamental (Hz) | Harmonic content | Suitable for sensitive loads? |
|----------|-----------------|-----------------|------------------------------|
| Square wave | | | |
| SPWM (unfiltered) | | | |
| SPWM (filtered) | | | |

---

## Components Required

- ESP32 DevKit V1
- Breadboard
- Jumper wires
- Oscilloscope (OWON HDS272S recommended, DSO Nano compatible)

Optional:

- 2 × IRLZ44N MOSFETs (for half-bridge demonstration)
- IR2104 half-bridge gate driver

> Note: Full H-bridge experiments require 4 MOSFETs and gate driver ICs. This project demonstrates the waveform generation principles using single-ended PWM outputs.

---

## Safety Notice

```text
Low Voltage Demonstrations Only
```

Do not connect experimental circuits directly to mains wiring.

---

## Experiment 1 - Generate a 50 Hz Square Wave

### Objective

Generate a low-frequency square wave that represents the fundamental switching pattern of a square-wave inverter, and measure it on the oscilloscope.

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
    // Configure GPIO18 as a digital output.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Toggle GPIO18 every 10 ms to produce a 50 Hz square wave.
    // Period = 10 ms HIGH + 10 ms LOW = 20 ms → f = 1/0.02 = 50 Hz.
    digitalWrite(18, HIGH);
    delay(10);

    digitalWrite(18, LOW);
    delay(10);
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)`.

---

### Frequency Calculation

The period is:

$$
T = 10\ \text{ms} + 10\ \text{ms} = 20\ \text{ms}
$$

Therefore:

$$
f = \frac{1}{T} = \frac{1}{0.02} = 50\ \text{Hz}
$$

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
3.3V  ________        ________
              │        │
              │        │
0V  __________│________│________
```

---

### Observe

The waveform should switch between 0 V and approximately 3.3 V at 50 Hz.

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | 50 Hz | |
| Period | 20 ms | |
| Peak Voltage | ~3.3 V | |

---

## Experiment 2 - Observe PWM Switching

### Objective

Observe high-frequency PWM operation as used in a PWM inverter carrier.

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
    // This represents the high-frequency carrier used in a PWM inverter.
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

### Observe

A PWM waveform should be visible at approximately 500 Hz.

---

## Experiment 3 - Duty Cycle Investigation

### Objective

Observe how varying duty cycle changes the average voltage — the same principle used to control inverter output amplitude.

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
    ledcWrite(0, 64);    // ~25% duty cycle
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Results Table

| PWM Value | Duty Cycle | Observation |
|-----------|------------|-------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

## Experiment 4 - SPWM Generation

### Objective

Generate a sinusoidal PWM pattern using a sine lookup table, demonstrating how a real inverter modulates its output.

---

### ESP32 Code

```cpp
const int N = 10;
const int sine_table[N] = {
    128, 203, 243, 255, 243,
    203, 128,  53,  13,   0
};

void setup()
{
    // Configure LEDC channel 0: 500 Hz carrier, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    for (int i = 0; i < N; i++)
    {
        ledcWrite(0, sine_table[i]);
        delay(2);
    }
}
```

> **Arduino Uno:** replace `ledcWrite(0, sine_table[i])` with `analogWrite(9, sine_table[i])` on pin 9.

---

### What Is Happening?

Each PWM cycle has a different duty cycle following the shape of a sine wave.

The average voltage at each step approximates:

$$
V_{AVG}(t) = V_{DC} \cdot \sin(2\pi f_{out} t)
$$

After low-pass filtering this produces an approximate sine wave output.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 2 ms/div | 2 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Observation

You should observe PWM pulses with varying width:

```text
| |   | |     | |       | |     | |   | |
```

Narrow pulses at the start and end, wide pulses in the middle.

This is the SPWM pattern.

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| PWM carrier frequency | ~500 Hz | |
| Output period | ~20 ms | |
| Output frequency | ~50 Hz | |
| Min duty cycle | ~0% | |
| Max duty cycle | ~100% | |

---

## MATLAB Comparison

Compare your measured square wave and SPWM waveforms against the simulated predictions.

```matlab
f_measured   = 50.0;     % replace with your measured frequency from Experiment 1 (Hz)
Vpeak_meas   = 5.0;      % replace with your measured peak voltage (V)

t = 0:1e-5:0.06;

v_ideal = Vpeak_meas * sign(sin(2*pi*50*t));
v_meas  = Vpeak_meas * sign(sin(2*pi*f_measured*t));

figure; hold on;
plot(t*1e3, v_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', 'Ideal 50Hz square wave');
plot(t*1e3, v_meas,  'r',   'LineWidth', 2, ...
    'DisplayName', sprintf('Measured f=%.1fHz', f_measured));
grid on;
xlabel('Time (ms)'); ylabel('Voltage (V)');
title('Square Wave Inverter - Ideal vs Measured');
legend('Location', 'northeast');

fprintf('Ideal frequency:    50.0 Hz\n');
fprintf('Measured frequency: %.1f Hz\n', f_measured);
fprintf('Frequency error:    %.2f%%\n', 100*abs(f_measured-50)/50);
```

### SPWM Duty Cycle Verification

```matlab
N = 10;
i = 0:N-1;
D_theory  = 0.5 * (1 + sin(2*pi*i/N));
D_spwm    = [128, 203, 243, 255, 243, 203, 128, 53, 13, 0] / 255;

figure; hold on;
plot(i, D_theory, 'b--o', 'LineWidth', 2, 'DisplayName', 'Ideal sine');
plot(i, D_spwm,   'r-s',  'LineWidth', 2, 'DisplayName', 'ESP32 lookup table');
grid on;
xlabel('Step'); ylabel('Duty Cycle');
title('SPWM Lookup Table - Ideal vs ESP32');
legend('Location', 'south');
```

### Reflection

- Does your measured square wave frequency match 50 Hz? What causes any discrepancy?
- The SPWM lookup table uses only 10 steps per cycle. How would increasing to 20 steps improve the output waveform quality?
- Why does the square wave have significant harmonic content at 150 Hz, 250 Hz, 350 Hz etc., while a pure sine wave does not?

---

## Troubleshooting

### Incorrect Frequency

Check:

✅ Delay values in code (each delay(10) contributes 10 ms)

✅ Frequency calculation: f = 1 / (2 × delay in seconds)

---

### PWM Not Visible

Check:

✅ Probe tip on GPIO18

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for 500 Hz)

---

### Waveform Unstable

Check:

✅ Trigger level set to approximately half the signal amplitude

✅ Ground connection secure

---

### Troubleshooting Checklist

✅ Controller powered and sketch uploaded

✅ Square wave frequency verified at 50 Hz

✅ PWM waveform visible at ~500 Hz

✅ Duty cycle changes correctly in Experiment 3

✅ SPWM varying pulse widths visible in Experiment 4

✅ Oscilloscope triggering correctly

---

## Knowledge Check

### Question 1

What is an inverter?

---

### Question 2

What is the purpose of an H-Bridge?

---

### Question 3

Why is PWM used in modern inverters?

---

### Question 4

What is SPWM?

---

### Question 5

What is shoot-through?

---

### Question 6

A square wave at 50 Hz contains harmonics at 150 Hz, 250 Hz, 350 Hz and so on. Explain why these odd harmonics are present and why they are absent in a pure sine wave. Why does this matter for motor drives?

---

## Project Summary

In this project you learned:

✅ DC-to-AC conversion

✅ Inverter fundamentals

✅ H-Bridge operation

✅ Square-wave generation

✅ PWM inverters

✅ SPWM concepts

✅ Dead time and shoot-through protection

You have now studied all three major power conversion categories:

```text
AC → DC

DC → DC

DC → AC
```

---

## Next Project

```text
11_System_Identification.md
```

Topics:

- Dynamic System Modelling
- Experimental Measurements
- Time Constant Estimation
- First-Order Models
- Second-Order Models
- Transfer Functions
- Model Validation
