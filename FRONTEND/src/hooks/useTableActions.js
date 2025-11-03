import { useState } from 'react'

export const useTableActions = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [filters, setFilters] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = (items) => {
    setSelectedItems(prev =>
      prev.length === items.length ? [] : items.map(item => item.id)
    )
  }

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  return {
    selectedItems,
    filters,
    sortConfig,
    handleSelectItem,
    handleSelectAll,
    handleSort,
    handleFilter,
    clearFilters
  }
}