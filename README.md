# eLunch

Approach:
- Generate the list of events with information such as "is self", "is overlap > 30" and "duration of lunch"
- Find out the events with maximum overlap duration
- If more than 1 event has same "maximum overlap duration", set "isOverlapped" property true for that event with earlier start time and set "isOverlapped" property true for "self" event
- If more than 1 event has same "maximum overlap duration" and same "start time", set "isOverlapped" property true for a random event out of that and set "isOverlapped" property true for "self" event
- Generate the Y-axis markers for the boundary 9am to 9pm, where 9am is the (0,0) coordinate.
- Generate quardrant to be used to draw the events.
- Iterate through the "filtered" list of events to create "event" elements. Set style properties such as position (mapped to start), height (mapped to duration) and color (mapped to isOverlapped or isSelf)

Note: I used css flex concept to arrange the events in the quardrant.

Pending task: 
- A lunch event should utilize the maximum width available.
