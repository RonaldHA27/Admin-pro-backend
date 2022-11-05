const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu =  [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', url :'./'},
            {titulo: 'Gráfica', url :'grafica1'},
            {titulo: 'rxjs', url : 'rxjs'},
            {titulo: 'progressBar', url :'progress'},
            {titulo: 'promesas', url : 'promesas'},
          ]
        },
    
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuarios', url :'usuarios'},
            {titulo: 'Hospitales', url :'hospitales'},
            {titulo: 'Médicos', url:'medicos'},
            
          ]
        }
    
        ];


    if (role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo:'Usuarios', url:'usuarios'})
    }

    return menu;

}

module.exports={
    getMenuFrontEnd
}