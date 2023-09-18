package com.ssafy.economius.game.listener;

import com.ssafy.economius.game.constant.InitialData;
import com.ssafy.economius.game.entity.mysql.EventMoney;
import com.ssafy.economius.game.entity.mysql.EventStock;
import com.ssafy.economius.game.entity.mysql.Insurance;
import com.ssafy.economius.game.entity.mysql.InsuranceType;
import com.ssafy.economius.game.entity.mysql.Issue;
import com.ssafy.economius.game.entity.mysql.IssueStock;
import com.ssafy.economius.game.entity.mysql.PrevIssue;
import com.ssafy.economius.game.entity.mysql.Savings;
import com.ssafy.economius.game.entity.mysql.Stock;
import com.ssafy.economius.game.entity.mysql.StockIndustry;
import com.ssafy.economius.game.entity.mysql.Volatile;
import com.ssafy.economius.game.repository.mysql.EventMoneyRepository;
import com.ssafy.economius.game.repository.mysql.EventStockRepository;
import com.ssafy.economius.game.repository.mysql.InsuranceRepository;
import com.ssafy.economius.game.repository.mysql.InsuranceTypeRepository;
import com.ssafy.economius.game.repository.mysql.IssueRepository;
import com.ssafy.economius.game.repository.mysql.IssueStockRepository;
import com.ssafy.economius.game.repository.mysql.PrevIssueRepository;
import com.ssafy.economius.game.repository.mysql.SavingsRepository;
import com.ssafy.economius.game.repository.mysql.StockIndustryRepository;
import com.ssafy.economius.game.repository.mysql.StockRepository;
import com.ssafy.economius.game.repository.mysql.VolatileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class InitialDataListener {

    private final EventMoneyRepository eventMoneyRepository;
    private final EventStockRepository eventStockRepository;
    private final InsuranceRepository insuranceRepository;
    private final InsuranceTypeRepository insuranceTypeRepository;
    private final IssueRepository issueRepository;
    private final IssueStockRepository issueStockRepository;
    private final PrevIssueRepository prevIssueRepository;
    private final SavingsRepository savingsRepository;
    private final StockIndustryRepository stockIndustryRepository;
    private final StockRepository stockRepository;
    private final VolatileRepository volatileRepository;

    @Transactional(readOnly = true)
    @EventListener
    public void setInitialData(ContextRefreshedEvent event) {
        setSavings();
        log.info(InitialData.savings.size() + " savings loaded.");
        setVolatiles();
        log.info(InitialData.volatiles.size() + " volaties loaded.");
        setEvents();
        log.info(InitialData.events.getEventStocks().size() + " stock events loaded.");
        log.info(InitialData.events.getEventMonies().size() + " money events loaded.");
        setInsurances();
        log.info(InitialData.insurances.size() + " insurances loaded.");
        setIssues();
        log.info(InitialData.issues.size() + " issues loaded.");
        setStockIndustries();
        log.info(InitialData.stockIndustries.size() + " stock industry loaded.");
        setStocks();
        log.info(InitialData.stocks.size() + " stocks loaded.");
        setInsuranceTypes();
        log.info(InitialData.insuranceTypes.size() + " insurance types loaded.");
    }

    private void setSavings() {
        List<Savings> savings = savingsRepository.findAll();
        for (Savings saving: savings) {
            com.ssafy.economius.game.constant.Savings tmp = new com.ssafy.economius.game.constant.Savings();
            tmp.setSavingsId(saving.getSavingsId());
            tmp.setName(saving.getName());
            tmp.setMonthlyDeposit(saving.getMonthlyDeposit());
            tmp.setFinishCount(saving.getFinishCount());
            tmp.setFinishRate(saving.getFinishRate());
            InitialData.savings.add(tmp);
        }
    }

    private void setVolatiles() {
        List<Volatile> volatiles = volatileRepository.findAll();
        for (Volatile vol: volatiles) {
            com.ssafy.economius.game.constant.Volatile tmp = new com.ssafy.economius.game.constant.Volatile();
            tmp.setVolatileId(vol.getVolatileId());
            tmp.setName(vol.getName());
            tmp.setType(vol.getType());
            tmp.setInitialValue(vol.getInitialValue());
            InitialData.volatiles.add(tmp);
        }
    }

    private void setEvents() {
        List<EventStock> eventStocks = eventStockRepository.findAllWithStockIndustry();
        for (EventStock eventStock: eventStocks) {
            com.ssafy.economius.game.constant.EventStock tmp = new com.ssafy.economius.game.constant.EventStock();
            tmp.setEventStockId(eventStock.getEventStockId());
            tmp.setStockIndustryId(eventStock.getStockIndustry().getStockIndustryId());
            tmp.setIndustry(eventStock.getStockIndustry().getIndustry());
            tmp.setName(eventStock.getName());
            tmp.setDescription(eventStock.getDescription());
            tmp.setRate(eventStock.getRate());
            InitialData.events.getEventStocks().add(tmp);
        }

        List<EventMoney> eventMoneys = eventMoneyRepository.findAllWithInsuranceType();
        for (EventMoney eventMoney: eventMoneys) {
            com.ssafy.economius.game.constant.EventMoney tmp = new com.ssafy.economius.game.constant.EventMoney();
            tmp.setEventMoneyId(eventMoney.getEventMoneyId());
            tmp.setInsuranceTypeId(eventMoney.getInsuranceType().getInsuranceTypeId());
            tmp.setTypeCode(eventMoney.getInsuranceType().getTypeCode());
            tmp.setTypeName(eventMoney.getInsuranceType().getTypeName());
            tmp.setName(eventMoney.getName());
            tmp.setDescription(eventMoney.getDescription());
            tmp.setMoney(eventMoney.getMoney());
            InitialData.events.getEventMonies().add(tmp);
        }
    }

    private void setInsurances() {
        List<Insurance> insurances = insuranceRepository.findAllWithInsuranceType();
        for (Insurance insurance : insurances) {
            com.ssafy.economius.game.constant.Insurance tmp = new com.ssafy.economius.game.constant.Insurance();
            tmp.setInsuranceId(insurance.getInsuranceId());
            tmp.setInsuranceTypeId(insurance.getInsuranceType().getInsuranceTypeId());
            tmp.setTypeCode(insurance.getInsuranceType().getTypeCode());
            tmp.setTypeName(insurance.getInsuranceType().getTypeName());
            tmp.setProductCode(insurance.getProductCode());
            tmp.setProductName(insurance.getProductName());
            tmp.setMonthlyDeposit(insurance.getMonthlyDeposit());
            tmp.setGuaranteeRate(insurance.getGuaranteeRate());
            InitialData.insurances.add(tmp);
        }
    }

    private void setIssues() {
        List<Issue> issues = issueRepository.findAll();
        for (Issue issue: issues) {
            com.ssafy.economius.game.constant.Issue tmp = new com.ssafy.economius.game.constant.Issue();
            tmp.setIssueId(issue.getIssueId());
            tmp.setName(issue.getName());
            tmp.setType(issue.typeByteToBoolean());
            tmp.setCountry(issue.getCountry());
            tmp.setYear(issue.getYear());
            tmp.setDescription(issue.getDescription());
            setIssueStocks(tmp);
            setPrevIssues(tmp);
            InitialData.issues.add(tmp);
        }
    }

    private void setIssueStocks(
            com.ssafy.economius.game.constant.Issue issue) {
        List<IssueStock> issueStocks = issueStockRepository.findIssueStockByIssueId(issue.getIssueId());

        for (IssueStock issueStock: issueStocks) {
            com.ssafy.economius.game.constant.IssueStock tmp = new com.ssafy.economius.game.constant.IssueStock();
            tmp.setIssueStockId(issueStock.getIssueStockId());
            tmp.setAssetType(issueStock.getAssetType());
            tmp.setAssetId(issueStock.getAssetId());
            tmp.setChangeUnit(issueStock.getChangeUnit());
            tmp.setChangeReason(issueStock.getChangeReason());
            issue.getIssueStocks().add(tmp);
        }
    }

    private void setPrevIssues(com.ssafy.economius.game.constant.Issue issue) {
        List<PrevIssue> prevIssues = prevIssueRepository.findPrevIssueByIssueId(issue.getIssueId());

        for (PrevIssue prevIssue : prevIssues) {
            com.ssafy.economius.game.constant.PrevIssue tmp = new com.ssafy.economius.game.constant.PrevIssue();
            tmp.setPrevIssueId(prevIssue.getPrevIssueId());
            tmp.setForetoken(prevIssue.getForetoken());
            issue.getPrevIssues().add(tmp);
        }
    }

    private void setStockIndustries() {
        List<StockIndustry> stockIndustries = stockIndustryRepository.findAll();
        for (StockIndustry StockIndustry : stockIndustries) {
            com.ssafy.economius.game.constant.StockIndustry tmp = new com.ssafy.economius.game.constant.StockIndustry();
            tmp.setStockIndustryId(StockIndustry.getStockIndustryId());
            tmp.setIndustry(StockIndustry.getIndustry());
            InitialData.stockIndustries.add(tmp);
        }
    }

    private void setStocks() {
        List<Stock> stocks = stockRepository.findAllWithStockIndustries();
        for (Stock stock : stocks) {
            com.ssafy.economius.game.constant.Stock tmp = new com.ssafy.economius.game.constant.Stock();
            tmp.setStockId(stock.getStockId());
            tmp.setStockIndustryId(stock.getStockIndustry().getStockIndustryId());
            tmp.setIndustry(stock.getStockIndustry().getIndustry());
            tmp.setType(stock.getType());
            tmp.setCompany(stock.getCompany());
            tmp.setInitialValue(stock.getInitialValue());
            InitialData.stocks.add(tmp);
        }
    }

    private void setInsuranceTypes() {
        List<InsuranceType> insuranceTypes = insuranceTypeRepository.findAll();
        for (InsuranceType insuranceType : insuranceTypes) {
            com.ssafy.economius.game.constant.InsuranceType tmp = new com.ssafy.economius.game.constant.InsuranceType();
            tmp.setInsuranceTypeId(insuranceType.getInsuranceTypeId());
            tmp.setTypeCode(insuranceType.getTypeCode());
            tmp.setTypeName(insuranceType.getTypeName());
            InitialData.insuranceTypes.add(tmp);
        }
    }
}
