const suffix = '.fc';

export default {
    breakpoint: new CustomEvent(`breakpoint${suffix}`),
    pageChanged: new CustomEvent(`pageChanged${suffix}`),
    pageChanging: new CustomEvent(`pageChanging${suffix}`),
};
