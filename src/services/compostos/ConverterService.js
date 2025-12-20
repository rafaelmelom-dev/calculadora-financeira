import { periodsFactors } from "../../../public/js/TimeReference.js";
import { pow } from 'mathjs';

const ConverterService = {
    converterTaxa: (taxa, from, to) => {
        const fromFactor = periodsFactors[from];
        const toFactor = periodsFactors[to];

        if (!fromFactor || !toFactor) {
            return null;
        } 

        return pow(taxa + 1, toFactor / fromFactor) - 1;
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