import axios from 'axios'
import Swal from 'sweetalert2'
const API=import.meta.env.VITE_API

export const getMedicineFromApi= async ()=>{
    try {
        const response=await axios.get('https://rxnav.nlm.nih.gov/REST/allconcepts.json?tty=SCD+GPCK+SBD+BPCK')
        console.log(response.data.minConceptGroup.minConcept[0])
        return response.data.minConceptGroup.minConcept
    } catch (error) {
        console.log(error)
    }
}