import { periodsFactors } from "../../../public/js/TimeReference.js";

const ConverterService = {
    converterTaxa: (taxa, from, to) => {
        const fromFactor = periodsFactors[from];
        const toFactor = periodsFactors[to];

        if (!fromFactor || !toFactor) {
            return null;
        } 

        return taxa * (toFactor / fromFactor);
    }, 
    converterTempo: (tempo, from, to) => {
        const fromFactor = periodsFactors[from];
        const toFactor = periodsFactors[to];

        if (!fromFactor || !toFactor) {
            return null;
        } 

        return tempo * (fromFactor / toFactor);
    }
}

export default ConverterService;
