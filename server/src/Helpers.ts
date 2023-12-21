/**
 * Converts from ticks to seconds.  1 tick = 100 nanoseconds.
 * @param offset the offset in ticks
 * @returns the offset in seconds
 */
export const convertOffsetToSeconds = (offset: number): number => {
    // why do all the samples do this?
    //const adder = 5000.0;

    // 1 tick = 100 nano seconds
    // 1 nano second = 0.000000001 seconds
    // offset * 100 * 0.000000001 => seconds
    // offset * 0.0000001 => seconds
    // offset / 10,000,000 => seconds
    // offset / 10,000 / 1,000 => seconds

    const adder = 0;
    return (offset + adder) / 10000.0 / 1000.0;
}
