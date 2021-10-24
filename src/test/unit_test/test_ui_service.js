import {expect} from "chai";
import UiService from "../../services/ui_service";


describe("test_ui_services", function() {
    it("normalizes the lowest possible value", async function () {
        const normalized_number = UiService.normalize_number(-42);
        expect(normalized_number).to.equal(-5);
    });

    it("normalizes the highest possible value", async function () {
        const normalized_number = UiService.normalize_number(42);
        expect(normalized_number).to.equal(5);
    });

    it("gets the lean of the lowest possible value", async function () {
        const normalized_number = UiService.get_political_lean(-5);
        expect(normalized_number).to.equal("left");
    });

    it("gets the lean of the highest possible value", async function () {
        const normalized_number = UiService.get_political_lean(5);
        expect(normalized_number).to.equal("right");
    });

    it("gets the lean of a midle value", async function () {
        const normalized_number = UiService.get_political_lean(0);
        expect(normalized_number).to.equal("center");
    });
});
