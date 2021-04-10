<template>
    <div class="border">

        <div>
            <img src="../../assets/V1.png" style="width: 10%;" />
        </div>
        
        <form v-on:submit.prevent="onSubmit" class="formulario">
            <div class="fondoForm" style="padding:2em;">
                <h2 class="login">Abrir caja</h2>
                
                
                <sui-form-field>
                    <label class="custom-label">Introduzca un monto inicial:</label>
                    <sui-input icon="dollar sign" type="number" min="0" max="1000" v-model="cashbox.initialAmount" />
                </sui-form-field>
                <sui-divider hidden/>
                <sui-form-field>
                <sui-button size="large" fluid @click.native="continuar()" color="blue" content="Continuar" />
                <sui-divider hidden/>
                <sui-button color="teal" fluid size="large" @click.native="salir()" content="Salir" />
                </sui-form-field>

            </div>
            
        </form>
        <fondo />
    </div>
    
</template>
<script>
import fondo from "../../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.use(Particles);

export default {
    name: "abrirCaja",
    components: {
        fondo
    },
    data(){
        return {
            cantidad: 0,
            cashbox: {
                id:0,
                amount:0,
                cashboxNumber:0,
                date:"",
                endTime:"",
                initialAmount:0,
                startTime:"",
                totalSales:0,
                withdrawal:"",
                user:{
                    id:0
                }
            }
        }
    },
    methods: {
        continuar(){
            api.doPost("/cashbox/openBox", this.cashbox).then((response) => {
                this.$swal({
                    title: "Caja abierta",
                    icon: "success",
                }).then(result => { 
                    location.reload(); 
                    console.log(result);
                });
                
                console.log(response);
            }).catch((e) => { console.log(e); });
            //this.$router.push({name: "AbrirCaja", params: { cantidad: cant }});
        },
        salir(){
            this.$router.push({name: "Home"});
        }
    }
}
</script>
<style scoped>
.formulario {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 15%;
}
.fondoForm {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding-top: 0px;
  padding-bottom: 10%;
}

.login {
  padding-right: 50%;
  color: #64b5f6;
}

.custom-label{
    display: block;
    margin: 0 0 .28571429rem 0;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
}

.btnGo {
  padding-left: 20% !important;
  padding-right: 20% !important;
  margin-top: 10%;
  margin-bottom: 10% !important;
}
</style>