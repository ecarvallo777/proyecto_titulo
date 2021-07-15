                                const selectElement = document.querySelector('.nieve');

                                selectElement.addEventListener('change', (event) => {
                                    const resultado = document.querySelector('.resultado');
                                    resultado.textContent = `Te gusta el sabor ${event.target.value}`;
                                });

