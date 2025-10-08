export const isReactionHaveReference = (reaction) => {
    const hasReferenceInReactants = reaction.reactants?.some(
        (r) => r.reference && r.reference.trim() !== ""
    );

    const hasReferenceInControllers = reaction.regulators?.some(
        (c) => c.reference && c.reference.trim() !== ""
    );

    return hasReferenceInReactants || hasReferenceInControllers;
};
