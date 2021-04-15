<template>
  <div>
    <header>
      <div class="ui left fixed vertical menu mymenu">
        <div class="item">
          <img class="ui centered tiny image" src="../assets/V1.png" />
        </div>
        <div class="">
          <a class="item" href="/cajero"><i class="list ul icon"></i>Menu</a>

          <a class="item" href="#" @click="logout()"
            ><i class="share square outline icon"></i>Salir</a
          >
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.mymenu {
  background: #2286c3 !important;
  border-radius: 0 !important;
}
.item {
  color: white !important;
}
.logo {
  height: 100%;
}

.wrapper {
  margin-left: 1%;
  overflow: hidden; /* Eliminamos errores de float */
}

/* Menú de hamburguesa */
#content {
  min-height: 100px;
}
.ui.grid {
  padding: 0 !important;
}
.pushable.segment {
  margin: 0 !important;
}
</style>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      visible: false,
    };
  },
  beforeMount(){
    let token = localStorage.getItem("token");
    if (token !== null) {
      let auth = localStorage.getItem("authority");
      if (auth !== null && auth === "ROLE_CASHIER") {
        let idCashbox = localStorage.getItem("idCashbox");
        if(idCashbox === null){
          this.$router.push("/cajero/abrir-caja");
        }
      }else{
        this.$router.push("/");  
      }
    }else{
      localStorage.clear();
      this.$router.push("/");
    }
  },
  methods: {
    logout(){
      this.$swal({
        title:"¿Esta seguro que desea cerrar sesión?",
        icon:"question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
        
      }).then(result=>{
        if(result.isConfirmed){
          localStorage.clear();
          this.$router.push("/");
        }
      })
    },
    onVisible() {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
  },
};
</script>