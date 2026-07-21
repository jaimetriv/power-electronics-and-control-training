# Oscilloscope Familiarisation (OWON HDS272S + DSO Nano)

### Prerequisites

Before starting any project in this repository, spend some time becoming familiar with your oscilloscope.

This guide uses the OWON HDS272S as the baseline scope.
Equivalent measurements can be made with the DSO Nano.

The oscilloscope will be one of the most important tools used throughout this course.

We will repeatedly use it to:

- Visualise signals
- Verify calculations
- Observe transient responses
- Debug circuits
- Validate MATLAB simulations

---

## Objective

In this project you will learn:

- What an oscilloscope does
- How to safely connect the DSO Nano
- How to adjust voltage scale
- How to adjust time scale
- How to use triggering
- How to measure voltage
- How to measure frequency
- How to measure PWM signals

For OWON HDS272S users, this project also establishes the default setup workflow used in later labs.

---

## Learning Outcomes

At the end of this exercise you should be able to:

✅ Connect the DSO Nano safely

✅ Measure DC voltages

✅ Measure PWM waveforms

✅ Adjust vertical scale

✅ Adjust horizontal scale

✅ Use the trigger system

✅ Prepare the oscilloscope for future experiments

---

## What Is An Oscilloscope?

An oscilloscope displays:

```text
Voltage
   ^
   |
   |
   |
   +-----------------> Time
```

Unlike a multimeter, which provides a single number, an oscilloscope shows how voltage changes over time.

---

## Why Oscilloscopes Are Important

A multimeter can tell you:

```text
Voltage = 2.5V
```

but it cannot easily tell you:

- Frequency
- Duty cycle
- Ringing
- Oscillation
- Ripple
- Transient response

An oscilloscope can.

---

## About The OWON HDS272S and DSO Nano

The OWON HDS272S is the recommended baseline oscilloscope for this repository.

It provides:

✅ Higher bandwidth and sampling capability

✅ Larger display and easier waveform inspection

✅ Better triggering and measurement tools

The DSO Nano remains useful as a portable fallback option.

---

## About The DSO Nano

The DSO Nano is a portable digital oscilloscope.

It is ideal for:

✅ Arduino projects

✅ PWM measurements

✅ RC circuits

✅ RLC circuits

✅ MOSFET switching

✅ Basic power electronics

✅ Educational use

---

## Limitations

The DSO Nano is not a high-end laboratory oscilloscope.

Limitations include:

- Small display
- Single channel
- Limited bandwidth

These limitations do not affect the experiments in this repository.

---

## Understanding The Screen

The display shows:

```text
Voltage
   ^
   |
   |
   |
   +-----------------> Time
```

The vertical direction is:

```text
Voltage
```

The horizontal direction is:

```text
Time
```

---

## Important Controls

### Vertical Scale

Vertical scale controls:

```text
Volts per Division
```

Examples:

```text
5 V/div

2 V/div

1 V/div

500 mV/div
```

---

## What Is A Division?

The oscilloscope screen is divided into squares.

Example:

```text
+----+----+----+----+
|    |    |    |    |
+----+----+----+----+
|    |    |    |    |
+----+----+----+----+
```

Each square is called a:

```text
Division
```

---

## Example

Suppose:

```text
1 V/div
```

and the waveform height is:

```text
5 divisions
```

Then:

$$
V = 5V
$$

---

## Horizontal Scale

Horizontal scale controls:

```text
Time per Division
```

Examples:

```text
1 s/div

500 ms/div

100 ms/div

1 ms/div

500 us/div

100 us/div
```

---

## Example

Suppose:

```text
1 ms/div
```

and one cycle occupies:

```text
2 divisions
```

Then:

$$
T = 2ms
$$

---

## Frequency Review

Frequency is:

$$
f = \frac{1}{T}
$$

If:

$$
T = 2ms
$$

then:

$$
f = \frac{1}{0.002}
$$

$$
f = 500Hz
$$

---

## Triggering

Triggering stabilises the display.

Without triggering:

```text
Waveform moves randomly
```

With triggering:

```text
Waveform remains stable
```

---

## Trigger Type

For almost every project in this repository use:

```text
Edge Trigger
```

---

## Trigger Edge

Use:

```text
Rising Edge
```

for most experiments.

This means the oscilloscope begins drawing the waveform when voltage increases.

---

## Safe Oscilloscope Connections

For Arduino projects:

Always connect:

```text
Probe Ground
```

to:

```text
Arduino Ground
```

---

## Safe Connection

```text
Probe Tip
     |
     |
Signal Point

Probe Ground
     |
     |
Arduino GND
```

---

## Important Rule

Never connect the ground clip to random points in a circuit.

For the experiments in this repository:

```text
Ground Clip

↓

Arduino GND
```

Always.

---

## Experiment 1 - Ground Verification

### Objective

Verify that the oscilloscope is operating correctly.

---

## Connections

Connect:

```text
Probe Tip -> GND

Probe Ground -> GND
```

---

## Expected Result

You should see:

```text
--------------------------
```

a flat horizontal line.

---

## Why?

Ground is:

$$
0V
$$

and does not change with time.

---

## Experiment 2 - Measure Arduino DC Voltage

### Objective

Measure a constant voltage.

---

## Arduino Code

```cpp
void setup()
{
    pinMode(9, OUTPUT);

    digitalWrite(9, HIGH);
}

void loop()
{
}
```

---

## Connections

Probe Tip:

```text
Pin 9
```

Ground:

```text
Arduino GND
```

---

## DSO Nano Settings

For OWON HDS272S users, use equivalent vertical/time scales and edge trigger settings.

Vertical:

```text
2V/div
```

Horizontal:

```text
100 ms/div
```

Important:

- Ensure probe attenuation on the oscilloscope matches the probe switch (x1 or x10).
- If the probe is set to x10 but the oscilloscope is set to x1, displayed voltage will be incorrect.

---

## Expected Result

You should observe a flat line.

Voltage should be approximately:

$$
5V
$$

---

## Record Measurements

| Parameter | Value |
|------------|--------|
| Measured Voltage | |

---

## Experiment 3 - Observe PWM

### Objective

Observe a PWM signal.

---

## Arduino Code

```cpp
void setup()
{
    pinMode(9, OUTPUT);
}

void loop()
{
    analogWrite(9,128);
}
```

---

## Connections

Probe Tip:

```text
Pin 9
```

Ground:

```text
Arduino GND
```

---

## DSO Nano Setup

Vertical:

```text
2V/div
```

Horizontal:

```text
500 us/div
```

Trigger:

```text
Rising Edge
```

---

## Expected Waveform

```text
5V ─────      ─────
         │      │
         │      │
0V ______│______│______
```

---

## Measurements

Measure:

### Peak Voltage

Expected:

$$
V_{PEAK} \approx 5V
$$

---

### Frequency

Expected:

$$
f \approx 490Hz
$$

On Arduino Uno Pin 9, this value is typically around 490 Hz. Small variation is normal.

---

### Period

Expected:

$$
T \approx 2ms
$$

---

## Oscilloscope Measurement Worksheet

| Measurement | Expected | Actual |
|------------|-----------|---------|
| Peak Voltage | 5V | |
| Frequency | 490Hz | |
| Period | 2ms | |

---

## Understanding Scale Selection

### If Signal Is Too Small

Increase sensitivity:

```text
2V/div
↓
1V/div
↓
500mV/div
```

---

### If Signal Is Too Large

Decrease sensitivity:

```text
500mV/div
↓
1V/div
↓
2V/div
↓
5V/div
```

---

## Understanding Time Scale Selection

### If Waveform Is Too Compressed

Use:

```text
Larger Time Scale
```

Example:

```text
500us/div

↓

1ms/div
```

---

### If Waveform Is Too Wide

Use:

```text
Smaller Time Scale
```

Example:

```text
1ms/div

↓

500us/div
```

---

## Common Measurements We Will Perform Later

Throughout this repository the DSO Nano will be used to measure:

### Project 1

PWM Frequency

PWM Duty Cycle

---

### Project 2

RC Charging

RC Discharging

Time Constants

---

### Project 3

Ringing

Oscillation

Natural Frequency

---

### Project 4

MOSFET Gate Signals

Switching Behaviour

---

### Project 5

Motor PWM Drive Signals

---

### Project 9

Buck Converter Ripple

Switch Node Waveforms

---

### Project 10

Closed Loop Responses

Settling Time

Transient Behaviour

---

## Knowledge Check

### Question 1

What does the vertical axis represent?

Answer:

```text
____________________
```

---

### Question 2

What does the horizontal axis represent?

Answer:

```text
____________________
```

---

### Question 3

What does 2 V/div mean?

Answer:

```text
____________________
```

---

### Question 4

Why is trigger important?

Answer:

```text
____________________
```

---

### Question 5

Where should the probe ground be connected?

Answer:

```text
____________________
```

---

## Common Mistakes

### No Signal Visible

Check:

- Probe connection
- Ground connection
- Arduino powered

---

### Unstable Waveform

Check:

- Trigger settings
- Trigger level

---

### Incorrect Voltage Measurement

Check:

- Vertical scale
- Probe connection

---

### Incorrect Frequency Measurement

Check:

- Horizontal scale
- Trigger settings

---

## Troubleshooting Checklist

✅ Battery charged

✅ Probe connected correctly

✅ Ground connected to Arduino GND

✅ Trigger enabled

✅ Correct voltage scale selected

✅ Correct time scale selected

---

## Summary

In this exercise you learned:

✅ Oscilloscope basics

✅ Voltage measurements

✅ Frequency measurements

✅ Period measurements

✅ Triggering

✅ Scale adjustment

✅ PWM visualisation

✅ Safe probing techniques

You are now ready to begin the laboratory projects.

---

## Next Step

Proceed to:

```text
01_PWM_Fundamentals.md
```

and perform your first PWM experiment.
