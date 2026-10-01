# Project 05 - DC Chopper Operation

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapters 1–2, for circuit variables, power, and circuit laws. Then read _Fundamentals of Power Electronics_ by Erickson and Maksimovic, Chapter 3, **Steady-State Converter Analysis**, for switching intervals and average conversion. This lab introduces the general chopper idea; Labs 06 and 07 derive the buck and boost topologies in detail.

---

## Objective

In this project you will learn:

- How a controlled switch produces a pulsed output
- The difference between instantaneous voltage and its switching-period average
- How duty ratio determines the ideal average voltage of a step-down chopper
- How a low-pass filter smooths a pulsed waveform
- How the general chopper principle leads into buck and boost converter topologies

This is a simulation-led introduction. It does not build a motor drive or investigate regenerative quadrants; motor dynamics are covered in Lab 08.

---

## Chopper Operation

A DC chopper controls power from a DC source by rapidly switching a semiconductor device. In the ideal step-down case, the switch-node voltage alternates between zero and the input voltage:

```text
Switch ON:  v_o = V_IN
Switch OFF: v_o = 0
```

One switching period, $T$, has two intervals:

| Interval | Duration | Ideal switch-node voltage |
|---|---:|---:|
| Switch ON | $t_{ON}=DT$ | $V_{IN}$ |
| Switch OFF | $t_{OFF}=(1-D)T$ | $0$ V |

The duty ratio is the fraction of each switching period for which the switch is on:

$$
D=\frac{t_{ON}}{T},\qquad 0\leq D\leq1
$$

The instantaneous switch-node voltage is still a pulse train. To find its average over one full period, add the voltage-time contribution from each interval and divide by the period. The OFF interval contributes zero volts:

$$
V_{o,avg}=\frac{V_{IN}(DT)+0((1-D)T)}{T}=D V_{IN}
$$

For $V_{IN}=3.3\ \mathrm{V}$ and $D=0.5$, the switch is ON for half the period and OFF for half. Therefore:

$$
V_{o,avg}=0.5(3.3)=1.65\ \mathrm{V}
$$

The average, 1.65 V in this example, is **not** the voltage at every instant: the switch node still alternates between 0 V and 3.3 V. A load or filter responds to those pulses and determines how much switching ripple remains in the output. In this lab's simple low-pass model, the filtered output settles near the calculated average; a real buck converter uses its inductor, capacitor, and load to shape the output, as studied in Lab 06.

### Assumptions and What Carries Forward

The equation $V_{o,avg}=D V_{IN}$ here assumes an ideal switch, constant input voltage, a repeating steady-state PWM waveform, and an average taken over one complete switching period. It describes the average switch-node voltage for this step-down example.

An ideal buck converter also has $V_{OUT}=D V_{IN}$ in steady-state continuous conduction mode (CCM). Lab 06 derives that result using **inductor volt-second balance** and shows how the inductor, diode, and capacitor shape current and voltage ripple. The formula does not apply to every converter: Lab 07 derives the boost converter's different relationship.

## Topology Preview

The term **chopper** describes switched DC power conversion generally. A buck converter is a step-down topology and is developed in Lab 06. A boost converter is a distinct step-up topology, with a different ideal conversion relationship, and is developed in Lab 07.

??? note "Optional background: chopper quadrants"

    Chopper quadrant classes describe the signs of output voltage and current. A Type A chopper operates in the first quadrant, with positive voltage and current, and transfers power from source to load. A Type B chopper operates in the second quadrant, with positive voltage and negative current, allowing regenerative energy flow back toward the source. Type B does not simply mean “boost converter.”

    This lab models only first-quadrant operation; it does not test reverse current or regenerative braking.

## Simulink Model: Pulsed Voltage and Filtered Average

Build this signal-only model to compare the switching waveform with a smoothed output. The transfer-function block is an illustrative low-pass filter, not a physical power-stage or device-stress model. Lab 06 replaces this abstraction with a Simscape buck converter.

### Step 1: Create a Model

Create a blank Simulink model and save it as `DC_Chopper_Operation.slx`.

### Step 2: Add Blocks

| Block | Library path | Quantity |
|---|---|---:|
| Pulse Generator | Simulink > Sources | 1 |
| Gain | Simulink > Math Operations | 1 |
| Transfer Fcn | Simulink > Continuous | 1 |
| Scope | Simulink > Sinks | 1 |

### Step 3: Configure the Pulse Generator

Set:

| Parameter | Value |
|---|---:|
| Amplitude | `1` |
| Period | `0.002` s |
| Pulse width | `50` percent |
| Phase delay | `0` s |

This produces a normalized 0–1 pulse at 500 Hz.

### Step 4: Configure the Gain and Filter

Set the Gain block to `3.3`. This scales the normalized pulse to a modeled input of 3.3 V; it does not represent an ESP32 input pin.

Set the Transfer Fcn block to:

| Parameter | Value |
|---|---|
| Numerator coefficients | `[1]` |
| Denominator coefficients | `[0.02, 1]` |

The filter is $H(s)=1/(0.02s+1)$, with a 20 ms time constant. Since this is ten times the 2 ms switching period, its output should settle near the PWM average with reduced ripple.

### Step 5: Wire the Model

Connect the blocks so the raw switched voltage and filtered response both appear on the Scope:

```text
Pulse Generator -> Gain -> Scope input 1
                         -> Transfer Fcn -> Scope input 2
```

Set the Scope to two input ports. Branch the Gain output so it feeds both the Scope and Transfer Fcn.

### Step 6: Configure and Run

Set the model stop time to `0.1` s and use a variable-step `ode45` solver. Run the model and observe both traces.

- Scope input 1 should switch between 0 V and 3.3 V.
- Scope input 2 should rise toward the switching-period average.
- At 50% duty, the filtered output should settle near 1.65 V.
- The filtered trace is smoother, but it is not perfectly constant.

### Step 7: Sweep Duty Ratio

Change the Pulse Generator pulse width and rerun the model:

| Duty ratio | Ideal average for 3.3 V input |
|---:|---:|
| 25% | 0.825 V |
| 50% | 1.650 V |
| 75% | 2.475 V |

Record the settled filtered output and compare it with the ideal average. Explain any remaining ripple or transient error.

### Step 8: Compare Switching Frequency

Keep duty ratio at 50% and the filter time constant at 20 ms. Compare switching frequencies of 100 Hz, 500 Hz, and 1 kHz. For each, adjust the period to $T=1/f_s$ and keep the simulation stop time long enough for the filter output to settle.

| Switching frequency | Period | Expected comparison |
|---:|---:|---|
| 100 Hz | 10 ms | More visible filtered ripple |
| 500 Hz | 2 ms | Smaller filtered ripple |
| 1 kHz | 1 ms | Still smaller filtered ripple |

The average remains approximately $D V_{IN}$; increasing switching frequency mainly changes ripple and switching losses. This signal-only model does not calculate switching losses.

## Optional Hardware PWM Check

If Lab 01's PWM measurement is already complete, skip this check. Otherwise, follow its GPIO18 oscilloscope setup to verify a 0–3.3 V, 500 Hz, 50% duty-cycle command. This measures the controller output only; it is **not** a chopper power-stage or motor experiment.

## Knowledge Check

1. For $V_{IN}=3.3\ \mathrm{V}$ and $D=0.25$, calculate the ideal switching-period average.
2. Why does the switch-node waveform not become a constant voltage when its average is 1.65 V?
3. What changes when the filter time constant is increased relative to the switching period?
4. In the traditional chopper quadrant classification, what distinguishes Type B from a boost topology?
5. Which later lab introduces the physical buck power stage? Which introduces the boost topology?

## Next Project

Continue to [Buck Converter Operation](06_Buck_Converter.md), where the ideal step-down model is extended with an inductor, freewheel path, output capacitor, and ripple analysis.