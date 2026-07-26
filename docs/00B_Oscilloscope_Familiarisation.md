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

### Learning Outcomes
  
At the end of this project you should be able to:
✅ Connect the OWON HDS272S safely to a circuit
✅ Adjust the vertical scale to suit the signal
✅ Adjust the horizontal scale to suit the signal
✅ Use edge triggering to stabilise a waveform
✅ Measure DC voltage
✅ Measure peak voltage of a PWM signal
✅ Measure the period and frequency of a PWM signal
✅ Identify duty cycle from a waveform

✅ Use the built-in signal generator  

✅ Measure input and output signals simultaneously  

✅ Observe the behaviour of a simple low-pass filter  

✅ Measure signal attenuation as frequency changes  

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

The OWON HDS272S is a handheld digital oscilloscope, multimeter, and signal generator combined in a single instrument.

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
- Built-in signal generator (sine, square, triangle, sawtooth waveforms)

The built-in signal generator can be used together with the oscilloscope channels to investigate how circuits respond to different signals.

Throughout this course the signal generator will be used to inject known waveforms into circuits while simultaneously measuring both the input and output signals.

---

## About The Signal Generator

The OWON HDS272S includes a built-in signal generator accessible from the instrument menu.

The signal generator can output:

- Sine wave
- Square wave
- Triangle wave
- Sawtooth wave

Frequency and amplitude are adjustable. The output is available on the dedicated generator terminal on the instrument.

The signal generator will be used in later projects to provide a known test signal without needing an Arduino, for example when characterising RC and RLC circuit responses.

The signal generator outputs one waveform at a time. Although it cannot generate multiple frequencies simultaneously, it can easily be adjusted to test different frequencies manually.

This capability allows simple frequency-response experiments to be performed by observing how a circuit behaves as the signal frequency is changed.

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
### Experiment 5 - Observe a Low-Pass Filter

#### Objective
  
Observe how frequency affects the output voltage of a simple RC low-pass filter.

Learn how to:
- Use the OWON HDS272S signal generator
- Measure input and output signals simultaneously
- Observe signal attenuation
- Compare two waveforms using CH1 and CH2

#### Components Required

- 10 kΩ resistor
- 100 nF capacitor
- Breadboard
- Jumper wires
- OWON HDS272S

#### RC Low-Pass Filter

The following circuit passes low-frequency signals and attenuates high-frequency signals.

#### Circuit

```text
                     10 kΩ

VIN ----/\/\/\/\/\/\/\/\/\/\----+---- VOUT
                                |
                                |
                              100 nF
                                |
                                |
GND ----------------------------+---- GND
```

The output voltage is measured across the capacitor.

The cutoff frequency is approximately:

159 Hz

#### Important Ground Connection

All oscilloscope ground clips and the signal generator ground must be connected to the same circuit ground.

```text
Generator Ground
        |
        +------ GND

CH1 Ground
        |
        +------ GND

CH2 Ground
        |
        +------ GND
```

#### Signal Generator Setup

Waveform:Sine

Amplitude:2 Vpp

Offset:0 V

#### Connections

Generator Output  ──────► VIN

Generator Ground  ──────► GND

CH1 Probe Tip     ──────► VIN

CH1 Ground        ──────► GND

CH2 Probe Tip     ──────► VOUT

CH2 Ground        ──────► GND

#### Complete Wiring Diagram

```text
                    CH2 Probe Tip
                           |
                           ▼

                      +--- VOUT
                      |
                      |
                    100 nF
                      |
                      |
Generator GND --------+----------------+
                                        |
                                        |
                                 CH1 Ground
                                 CH2 Ground

Generator Output
       |
       |
       +---- VIN ----/\/\/\/\/\/\-----+
                        10 kΩ          |
                                       |
                                 CH1 Probe Tip
```

#### Oscilloscope Settings

<table>
<tr>
<th>
Setting
</th>
<th>
OWON HDS272S
</th>
</tr>
<tr>
<td>
Channels
</td>
<td>
CH1 and CH2
</td>
</tr>
<tr>
<td>
Vertical Scale
</td>
<td>
500 mV/div
</td>
</tr>
<tr>
<td>
Horizontal Scale
</td>
<td>
1 ms/div initially
</td>
</tr>
<tr>
<td>
Trigger Source
</td>
<td>
CH1
</td>
</tr>
<tr>
<td>
Trigger
</td>
<td>
Edge, Rising
</td>
</tr>
<tr>
<td>
Coupling
</td>
<td>
DC
</td>
</tr>
</table>

#### Procedure

##### Test A

Set the signal generator frequency to:

100 Hz

Measure:
- Input Voltage (CH1)
- Output Voltage (CH2)

##### Test B

Set the signal generator frequency to:

500 Hz

Measure:
- Input Voltage (CH1)
- Output Voltage (CH2)

##### Test C

Set the signal generator frequency to:

1 kHz

Measure:
- Input Voltage (CH1)
- Output Voltage (CH2)

##### Test D

Set the signal generator frequency to:

10 kHz

Measure:
- Input Voltage (CH1)
- Output Voltage (CH2)

#### Expected Result

At 100 Hz the input and output amplitudes should be similar.

At 500 Hz the output amplitude should be slightly smaller than the input.

At 1 kHz noticeable attenuation should be visible.

At 10 kHz the output voltage should be much smaller than the input voltage.

#### Record Measurements

<table>
<tr>
<th>
Frequency
</th>
<th>
Input Voltage (Vpp)
</th>
<th>
Output Voltage (Vpp)
</th>
<th>
Observation
</th>
</tr>
<tr>
<td>
100 Hz
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
500 Hz
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
1 kHz
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
10 kHz
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
</table>
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
#### Input Signal Visible But Output Missing
  
Check:  
  
✅ Generator output connected to VIN
  
✅ Generator ground connected to circuit GND
  
✅ CH2 probe tip connected to VOUT
  
✅ CH2 probe ground connected to GND
  
✅ Resistor connected between VIN and VOUT
  
✅ Capacitor connected between VOUT and GND
  
✅ Signal generator enabled and outputting a sine wave
  
✅ Common ground shared between signal generator and oscilloscope

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
#### Exercise 6
  
Build the RC Low-Pass Filter from Experiment 5.

Configure the OWON signal generator:

Waveform:Sine

Amplitude:2 Vpp

Offset:0 V

Measure the input voltage and output voltage at:

- 100 Hz
- 1 kHz
- 10 kHz
- 100 kHz

Record the measurements and compare the input and output amplitudes.

Determine experimentally whether the circuit behaves as a low-pass filter.

Calculate:

Output Ratio
=
VOUT / VIN

for each test frequency.
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
#### Question 7
  
What is the purpose of CH1 in the low-pass filter experiment?

#### Question 8
  
What is the purpose of CH2 in the low-pass filter experiment?

#### Question 9
  
Why does the output voltage decrease as the frequency increases?

#### Question 10
  
A 10 kΩ resistor and a 100 nF capacitor are connected as a low-pass filter.

The cutoff frequency is approximately:

159 Hz

Would a 100 Hz signal be attenuated more or less than a 10 kHz signal?

Explain your answer.
---

### Project Summary
  
In this project you learned:
✅ What an oscilloscope measures and why it is important
✅ How to connect the OWON HDS272S safely
✅ How to adjust the vertical scale
✅ How to adjust the horizontal scale
✅ How to use edge triggering
✅ How to measure DC voltage
✅ How to measure PWM peak voltage, period, frequency, and duty cycle

✅ How to use the built-in signal generator  

✅ How to measure input and output signals simultaneously  

✅ How to observe a simple low-pass filter  

✅ How to compare two waveforms using CH1 and CH2  

✅ How to observe signal attenuation as frequency changes  

✅ How to adjust scales to suit different signals  

These skills will be used in every subsequent project in this course, beginning with:

```text
01_PWM_Fundamentals.md
```
