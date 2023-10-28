export const checkDataInTable = (tableSelector: string, data: any[]) => {
    let foundRow = -1;

    cy.get(tableSelector).find('.oxd-table-card').each(($row, rowIndex) => {
        let allDataFound = true;

        cy.get($row).find('.oxd-table-cell').each(($cell, cellIndex) => {
            cy.wrap($cell).invoke('text').then((cellText) => {
                const cellTextLower = cellText.trim().toLowerCase();
                const expectedData = data[cellIndex] ? data[cellIndex].toString().toLowerCase().trim() : '';

                // console.log(`Comparing cellText: "${cellTextLower}" (Length: ${cellTextLower.length}) with expectedData: "${expectedData}" (Length: ${expectedData.length})`);

                if (!cellTextLower.includes(expectedData)) {
                    allDataFound = false;
                }
            });
        });

        cy.wrap($row).should(() => {
            if (allDataFound) {
                foundRow = rowIndex + 1;
                expect(foundRow).to.not.equal(-1);
            }
        });
    });

    cy.should(() => {
        if (foundRow !== -1) {
            console.log(`All data found in row ${foundRow}`);
        } else {
            console.log("Data not found in any row");
        }
    });
};
