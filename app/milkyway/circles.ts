function generateCircles() {
  const groups = [
    {count: 10, r: 3, filter: 'glow3', fill: '#D9D9D9'},
    {count: 40, r: 2, filter: 'glow2', fill: '#C6C6C6'},
    {count: 80, r: 1, filter: 'glow1', fill: '#DADADA'} // Примерное количество из исходника
  ];

  const padding = 2;
  const placed: {cx: number, cy: number, r: number}[] = [];

  groups.forEach(group => {
    for (let i = 0; i < group.count; i++) {
      let attempts = 0;
      let placedSuccessfully = false;
      while (attempts < 1000 && !placedSuccessfully) {
        const cx = Math.random() * 500;
        const cy = Math.random() * 500;
        let collision = false;

        for (const existing of placed) {
          const dx = cx - existing.cx;
          const dy = cy - existing.cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = group.r + existing.r + padding;

          if (distance < minDistance) {
            collision = true;
            break;
          }
        }

        if (!collision) {
          placed.push({cx, cy, r: group.r});
          console.log(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${group.r}" fill="${group.fill}" filter="url(#${group.filter})"/>`);
          placedSuccessfully = true;
        }

        attempts++;
      }

      if (!placedSuccessfully) {
        console.error(`Не удалось разместить круг группы ${group.r} после ${attempts} попыток`);
      }
    }
  });
}

generateCircles();