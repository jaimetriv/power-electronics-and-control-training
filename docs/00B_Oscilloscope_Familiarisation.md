# Project 00B - Oscilloscope Familiarisation

---

## Objective

The objective of this project is to become familiar with the OWON HDS272S oscilloscope and to learn how to use it to measure and analyse electrical signals.

This project introduces the basic oscilloscope skills required for the remainder of the course, including:

- Connecting the oscilloscope safely
- Adjusting the vertical (voltage) scale
- Adjusting the horizontal (time) scale
- Using the trigger system
- Measuring DC voltage
- Measuring PWM waveforms
- Measuring frequency and period

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Connect the OWON HDS272S safely to a circuit

✅ Adjust the vertical scale to suit the signal

✅ Adjust the horizontal scale to suit the signal

✅ Use edge triggering to stabilise a waveform

✅ Measure DC voltage

✅ Measure peak voltage of a PWM signal

✅ Measure the period and frequency of a PWM signal

✅ Identify duty cycle from a waveform

✅ Prepare the oscilloscope for future experiments

---

## What Is An Oscilloscope?

An oscilloscope displays how voltage changes over time:

```text
Voltage
   ^
   |  ___       ___
   | |   |     |   |
   | |   |     |   |
   +-+---+-----+---+-----> Time
```

Unlike a multimeter, which shows a single number, an oscilloscope shows the complete shape of a signal.

---

## Why Oscilloscopes Are Important

A multimeter can tell you:

```text
Voltage = 2.5 V
```

but it cannot tell you:

- Frequency
- Duty cycle
- Waveform shape
- Ringing or oscillation
- Ripple voltage
- Transient response

An oscilloscope can show all of these.

Throughout this course the oscilloscope will be used to:

- Verify PWM signals
- Observe RC and RLC circuit responses
- Measure MOSFET switching behaviour
- Inspect converter switch-node waveforms
- Validate closed-loop control responses

---

## About The OWON HDS272S

The OWON HDS272S is a handheld digital oscilloscope and multimeter combined in a single instrument.

```text
 ┌─────────────────────┐
 │  OWON HDS272S       │
 │                     │
 │  [  Display  ]      │
 │                     │
 │  CH1  CH2           │
 │  [Menu] [Trigger]   │
 │  [Scale] [Position] │
 │                     │
 │  CH1 ──●  CH2 ──●   │
 └─────────────────────┘
```

Key features relevant to this course:

- Two input channels
- Automatic measurements (frequency, period, duty cycle, Vpp)
- Edge triggering with adjustable level
- DC and AC coupling
- Built-in multimeter

---

## About The DSO Nano V3

The DSO Nano V3 is a compact single-channel fallback option.

All experiments in this project can be completed with either instrument. Where settings differ, both are noted.

---

## Understanding The Screen

The oscilloscope screen is a grid of squares called divisions:

```text
+------+------+------+------+------+
|      |      |      |      |      |
+------+------+------+------+------+
|      |      |   *  |      |      |
+------+------+--*---+------+------+
|      |      | *    |      |      |
+------+------+*-----+------+------+
|      |     *|      |      |      |
+------+----*-+------+------+------+
|      |  *   |      |      |      |
+------+------+------+------+------+
```

The vertical axis represents:

```text
Voltage
```

The horizontal axis represents:

```text
Time
```

---

## Vertical Scale

The vertical scale sets how many volts each division represents:

```text
Volts per Division (V/div)
```

Common settings:

```text
5 V/div
2 V/div
1 V/div
500 mV/div
200 mV/div
```

---

## Vertical Scale Example

If the vertical scale is set to:

```text
1 V/div
```

and the waveform spans 5 divisions from bottom to top, then:

$$
V_{peak} = 5 \times 1 = 5 \text{ V}
$$

---

## Horizontal Scale

The horizontal scale sets how much time each division represents:

```text
Time per Division (s/div, ms/div, us/div)
```

Common settings:

```text
1 s/div
100 ms/div
10 ms/div
1 ms/div
500 us/div
100 us/div
```

---

## Horizontal Scale Example

If the horizontal scale is set to:

```text
1 ms/div
```

and one complete cycle spans 2 divisions, then:

$$
T = 2 \times 1 \text{ ms} = 2 \text{ ms}
$$

---

## Frequency and Period

Frequency and period are related by:

$$
f = \frac{1}{T}
$$

If:

$$
T = 2 \text{ ms} = 0.002 \text{ s}
$$

then:

$$
f = \frac{1}{0.002} = 500 \text{ Hz}
$$

---

## Triggering

Without triggering the waveform scrolls continuously across the screen and is difficult to read.

Triggering tells the oscilloscope:

```text
Start drawing the waveform when the signal crosses
a defined voltage level in a defined direction.
```

With triggering enabled the waveform appears stable and stationary.

---

## Trigger Settings

For almost every experiment in this course use:

```text
Trigger Type:  Edge
Trigger Edge:  Rising
```

The trigger level should be set to approximately half the signal amplitude.

---

## Safe Oscilloscope Connections

For all Arduino and ESP32 experiments:

Always connect the probe ground clip to:

```text
Arduino GND  (or ESP32 GND)
```

Never connect the ground clip to a live signal or to a floating point.

```text
Probe Tip   ──────► Signal point to measure
Probe GND   ──────► Arduino GND
```

---

## Experiment 1 - Ground Verification

### Objective

Confirm the oscilloscope is working correctly before connecting it to any circuit.

---

### Procedure

1. Power on the OWON HDS272S.
2. Connect the CH1 probe tip to the CH1 probe ground clip (short them together).
3. Set the vertical scale to **1 V/div**.
4. Set the horizontal scale to **1 ms/div**.
5. Observe the display.

---

### Expected Result

You should see a flat horizontal line at the centre of the screen:

```text
-----------------------------------------
```

This confirms the oscilloscope is reading 0 V correctly.

If the line is not flat or not at zero, use the vertical position control to centre it.

---

## Experiment 2 - Measure a DC Voltage

### Objective

Measure a constant 5 V DC signal from the Arduino and confirm the oscilloscope reads the correct value.

---

### Arduino Code

```cpp
void setup()
{
    // Configure pin 9 as a digital output.
    pinMode(9, OUTPUT);

    // Set pin 9 permanently HIGH (5 V DC).
    // This gives a constant voltage for the oscilloscope to measure.
    digitalWrite(9, HIGH);
}

void loop()
{
    // Nothing needed here; the pin stays HIGH indefinitely.
}
```

---

### Connections

```text
Probe Tip  ──────► Arduino Pin D9
Probe GND  ──────► Arduino GND
```

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano V3 |
|---------|--------------|-------------|
| Channel | CH1 | CH1 |
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 100 ms/div | 100 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Result

You should see a flat horizontal line approximately 2.5 divisions above the centre line:

```text
___________________________________________   ← 5 V line (2.5 div above centre at 2 V/div)


- - - - - - - - - - - - - - - - - - - - - -  ← 0 V (centre)
```

The measured voltage should be approximately:

$$
V \approx 5 \text{ V}
$$

---

### Probe Attenuation Note

Check that the probe attenuation setting on the oscilloscope matches the switch on the probe body.

- If the probe switch is set to **x1**, set the oscilloscope to **x1**.
- If the probe switch is set to **x10**, set the oscilloscope to **x10**.

A mismatch will cause the displayed voltage to be 10 times too high or too low.

---

### Record Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| DC Voltage | 5 V | |

---

## Experiment 3 - Observe a PWM Signal

### Objective

Observe a PWM waveform and measure its peak voltage, period, and frequency.

---

### Arduino Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Output a PWM signal on pin 9 with a duty cycle of approximately 50%.
    // analogWrite() accepts values from 0 (0%) to 255 (100%).
    // Value 128 gives approximately 50% duty cycle.
    analogWrite(9, 128);
}
```

---

### Connections

```text
Probe Tip  ──────► Arduino Pin D9
Probe GND  ──────► Arduino GND
```

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano V3 |
|---------|--------------|-------------|
| Channel | CH1 | CH1 |
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 us/div | 500 us/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
5V  ─────      ─────      ─────
         │    │     │    │
         │    │     │    │
0V  _____│____│_____│____│_____
```

The signal switches between 0 V and 5 V at approximately 490 Hz.

At 50% duty cycle the ON time and OFF time are approximately equal.

---

### Measurements

Measure the following from the waveform:

#### Peak Voltage

Count the number of vertical divisions from the 0 V baseline to the top of the waveform and multiply by the V/div setting.

Expected:

$$
V_{peak} \approx 5 \text{ V}
$$

---

#### Period

Count the number of horizontal divisions for one complete cycle (from one rising edge to the next) and multiply by the time/div setting.

Expected:

$$
T \approx 2 \text{ ms}
$$

---

#### Frequency

Calculate from the measured period:

$$
f = \frac{1}{T} \approx \frac{1}{0.002} = 500 \text{ Hz}
$$

The actual Arduino Uno PWM frequency on pin 9 is approximately 490 Hz. Small variation is normal.

---

#### Duty Cycle

Measure the ON time (HIGH portion) and divide by the total period:

$$
D = \frac{t_{ON}}{T} \approx 50\%
$$

---

### Measurement Worksheet

| Measurement | Expected | Measured |
|-------------|----------|---------|
| Peak Voltage | 5 V | |
| Period | 2 ms | |
| Frequency | 490 Hz | |
| Duty Cycle | 50% | |

---

## Experiment 4 - Vary the Duty Cycle

### Objective

Observe how changing the PWM duty cycle changes the waveform shape.

---

### Arduino Code

```cpp
void setup()
{
    Serial.begin(9600);
}

void loop()
{
    // Sweep duty cycle from 0% to 100% in steps.
    // analogWrite() range: 0 (0%) to 255 (100%).
    for (int duty = 0; duty <= 255; duty += 64)
    {
        analogWrite(9, duty);

        // Print the current duty cycle percentage to the Serial Monitor.
        float percent = duty * (100.0 / 255.0);
        Serial.print("Duty cycle: ");
        Serial.print(percent, 1);
        Serial.println("%");

        delay(3000);   // Hold each duty cycle for 3 seconds to observe on the oscilloscope
    }
}
```

---

### Procedure

1. Upload the code.
2. Connect the oscilloscope as in Experiment 3.
3. Open the Serial Monitor at **9600 baud** to see which duty cycle is currently active.
4. For each duty cycle step, observe the waveform and sketch or note the ON time versus OFF time.

---

### Expected Observations

| analogWrite Value | Duty Cycle | Waveform |
|-------------------|------------|---------|
| 0 | 0% | Flat LOW (0 V) |
| 64 | 25% | Short ON, long OFF |
| 128 | 50% | Equal ON and OFF |
| 192 | 75% | Long ON, short OFF |
| 255 | 100% | Flat HIGH (5 V) |

---

## Adjusting The Scales

### Signal Too Small (waveform barely visible)

Increase sensitivity by reducing V/div:

```text
2 V/div  →  1 V/div  →  500 mV/div
```

---

### Signal Too Large (waveform clipped at top or bottom)

Decrease sensitivity by increasing V/div:

```text
500 mV/div  →  1 V/div  →  2 V/div  →  5 V/div
```

---

### Waveform Too Compressed (many cycles visible, hard to measure one)

Increase time resolution by reducing time/div:

```text
1 ms/div  →  500 us/div  →  100 us/div
```

---

### Waveform Too Wide (less than one cycle visible)

Decrease time resolution by increasing time/div:

```text
100 us/div  →  500 us/div  →  1 ms/div
```

---

## Troubleshooting

### No Signal Visible

Check:

✅ Probe tip connected to the correct pin

✅ Probe ground clip connected to Arduino GND

✅ Arduino powered and code uploaded

✅ Correct pin used (PWM requires pins 3, 5, 6, 9, 10, or 11 on Arduino Uno)

---

### Waveform Unstable or Scrolling

Check:

✅ Trigger enabled

✅ Trigger type set to Edge

✅ Trigger level set to approximately half the signal amplitude (around 2.5 V for a 5 V signal)

---

### Incorrect Voltage Reading

Check:

✅ Vertical scale (V/div) is appropriate for the signal

✅ Probe attenuation switch matches oscilloscope setting (x1 or x10)

✅ Probe ground connected to Arduino GND

---

### Incorrect Frequency Reading

Check:

✅ Horizontal scale (time/div) is appropriate — at least one full cycle should be visible

✅ Trigger is stable

---

### Troubleshooting Checklist

✅ OWON HDS272S powered on

✅ CH1 probe tip connected to signal

✅ CH1 probe ground connected to Arduino GND

✅ Trigger enabled with Edge, Rising

✅ Vertical scale appropriate for signal amplitude

✅ Horizontal scale appropriate for signal frequency

✅ Probe attenuation matches oscilloscope setting

---

## Laboratory Exercises

### Exercise 1

Set the Arduino to output a constant HIGH on pin 9 and measure the DC voltage. Record the result and compare to the expected 5 V.

---

### Exercise 2

Output a PWM signal with `analogWrite(9, 64)` (25% duty cycle). Measure the period, frequency, and duty cycle from the oscilloscope.

---

### Exercise 3

Output a PWM signal with `analogWrite(9, 192)` (75% duty cycle). Sketch the waveform and label the ON time and OFF time.

---

### Exercise 4

Change the horizontal scale while observing the 490 Hz PWM signal. Find the scale setting that shows exactly two complete cycles on screen.

---

### Exercise 5

Connect the potentiometer from Project 00A to A0 and use the following code to vary the PWM duty cycle with the potentiometer. Observe the waveform change on the oscilloscope as you turn the knob.

```cpp
void loop()
{
    int pot = analogRead(A0);          // 0 to 1023
    int duty = pot / 4;                // Scale to 0 to 255
    analogWrite(9, duty);
    delay(10);
}
```

---

## Knowledge Check

### Question 1

What does the vertical axis of an oscilloscope represent?

---

### Question 2

What does the horizontal axis of an oscilloscope represent?

---

### Question 3

If the vertical scale is set to 2 V/div and a waveform spans 3 divisions, what is the peak voltage?

---

### Question 4

If the horizontal scale is set to 500 us/div and one cycle spans 4 divisions, what is the period? What is the frequency?

---

### Question 5

Why is triggering important when observing a repeating waveform?

---

### Question 6

Where should the probe ground clip always be connected in Arduino experiments?

---

## Project Summary

In this project you learned:

✅ What an oscilloscope measures and why it is important

✅ How to connect the OWON HDS272S safely

✅ How to adjust the vertical scale

✅ How to adjust the horizontal scale

✅ How to use edge triggering

✅ How to measure DC voltage

✅ How to measure PWM peak voltage, period, frequency, and duty cycle

✅ How to adjust scales to suit different signals

These skills will be used in every subsequent project in this course, beginning with:

```text
01_PWM_Fundamentals.md
```
