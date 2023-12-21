/**
 * Renders images to a folder for the given synthesized verse
 */
export default interface IRenderer {
    render(): Promise<void>;
}