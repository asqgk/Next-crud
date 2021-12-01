import { useEffect, useState } from "react";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../firebase/db/ColecaoCliente";
import useVisibilidade from "./useVisibilidade";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const {
        tabelaVisivel,
        exibirFormulario,
        exibirTabela
    } = useVisibilidade()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])


    useEffect(obterTodos, [])

    function obterTodos() {
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }

    function selecionarCliente(cliente: Cliente) {
        setCliente(cliente)
        exibirFormulario()
    }

    async function excluirCliente(cliente: Cliente) {
        await repo.excluir(cliente)
        obterTodos()
    }

    async function salvarCliente(cliente: Cliente) {
        await repo.salvar(cliente)
        obterTodos()
    }

    function novoCliente() {
        setCliente(Cliente.vazio())
        exibirFormulario()
    }

    return {
        selecionarCliente,
        excluirCliente,
        salvarCliente,
        novoCliente,
        obterTodos,
        cliente,
        clientes,
        tabelaVisivel,
        exibirTabela
    }
}