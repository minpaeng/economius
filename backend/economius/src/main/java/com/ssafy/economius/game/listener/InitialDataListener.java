package com.ssafy.economius.game.listener;

import com.ssafy.economius.game.dto.mysql.EventMoneyDto;
import com.ssafy.economius.game.dto.mysql.EventStockDto;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.dto.mysql.InsuranceDto;
import com.ssafy.economius.game.dto.mysql.InsuranceTypeDto;
import com.ssafy.economius.game.dto.mysql.IssueDto;
import com.ssafy.economius.game.dto.mysql.IssueStockDto;
import com.ssafy.economius.game.dto.mysql.PrevIssueDto;
import com.ssafy.economius.game.dto.mysql.SavingsDto;
import com.ssafy.economius.game.dto.mysql.StockDto;
import com.ssafy.economius.game.dto.mysql.StockIndustryDto;
import com.ssafy.economius.game.dto.mysql.VolatileDto;
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
        log.info(InitialData.SAVINGS.size() + " savings loaded.");
        setVolatiles();
        log.info(InitialData.VOLATILES.size() + " volaties loaded.");
        setEvents();
        log.info(InitialData.EVENTS.getEventStocks().size() + " stock events loaded.");
        log.info(InitialData.EVENTS.getEventMonies().size() + " money events loaded.");
        setInsurances();
        log.info(InitialData.INSURANCES.size() + " insurances loaded.");
        setIssues();
        log.info(InitialData.ISSUES.size() + " issues loaded.");
        setStockIndustries();
        log.info(InitialData.STOCK_INDUSTRIES.size() + " stock industry loaded.");
        setStocks();
        log.info(InitialData.STOCKS.size() + " stocks loaded.");
        setInsuranceTypes();
        log.info(InitialData.INSURANCE_TYPE.size() + " insurance types loaded.");
    }

    private void setSavings() {
        List<Savings> savings = savingsRepository.findAll();
        for (Savings saving : savings) {
            SavingsDto tmp = new SavingsDto();
            tmp.setBankId(saving.getSavingsId());
            tmp.setSavingName(saving.getName());
            tmp.setMonthlyDeposit(saving.getMonthlyDeposit());
            tmp.setFinishCount(saving.getFinishCount());
            tmp.setRate(saving.getFinishRate());
            InitialData.SAVINGS.add(tmp);
        }
    }

    private void setVolatiles() {
        List<Volatile> volatiles = volatileRepository.findAll();
        for (Volatile vol : volatiles) {
            VolatileDto tmp = new VolatileDto();
            tmp.setVolatileId(vol.getVolatileId());
            tmp.setName(vol.getName());
            tmp.setType(vol.getType());
            tmp.setInitialValue(vol.getInitialValue());
            InitialData.VOLATILES.put(tmp.getType(), tmp);
        }
    }

    private void setEvents() {
        List<EventStock> eventStocks = eventStockRepository.findAllWithStockIndustry();
        for (EventStock eventStock : eventStocks) {
            EventStockDto tmp = new EventStockDto();
            tmp.setEventStockId(eventStock.getEventStockId());
            tmp.setStockIndustryId(eventStock.getStockIndustry().getStockIndustryId());
            tmp.setIndustry(eventStock.getStockIndustry().getIndustry());
            tmp.setName(eventStock.getName());
            tmp.setDescription(eventStock.getDescription());
            tmp.setRate(eventStock.getRate());
            tmp.setUrl(eventStock.getUrl());
            InitialData.EVENTS.getEventStocks().add(tmp);
        }

        List<EventMoney> eventMoneys = eventMoneyRepository.findAllWithInsuranceType();
        for (EventMoney eventMoney : eventMoneys) {
            EventMoneyDto tmp = new EventMoneyDto();
            tmp.setEventMoneyId(eventMoney.getEventMoneyId());
            tmp.setInsuranceTypeId(eventMoney.getInsuranceType().getInsuranceTypeId());
            tmp.setTypeCode(eventMoney.getInsuranceType().getTypeCode());
            tmp.setTypeName(eventMoney.getInsuranceType().getTypeName());
            tmp.setName(eventMoney.getName());
            tmp.setDescription(eventMoney.getDescription());
            tmp.setMoney(eventMoney.getMoney());
            tmp.setUrl(eventMoney.getUrl());
            InitialData.EVENTS.getEventMonies().add(tmp);
        }
    }

    private void setInsurances() {
        List<Insurance> insurances = insuranceRepository.findAllWithInsuranceType();
        for (Insurance insurance : insurances) {
            InsuranceDto tmp = new InsuranceDto();
            tmp.setInsuranceId(insurance.getInsuranceId());
            tmp.setInsuranceTypeId(insurance.getInsuranceType().getInsuranceTypeId());
            tmp.setTypeCode(insurance.getInsuranceType().getTypeCode());
            tmp.setTypeName(insurance.getInsuranceType().getTypeName());
            tmp.setProductCode(insurance.getProductCode());
            tmp.setProductName(insurance.getProductName());
            tmp.setMonthlyDeposit(insurance.getMonthlyDeposit());
            tmp.setGuaranteeRate(insurance.getGuaranteeRate());
            InitialData.INSURANCES.add(tmp);
        }
    }

    private void setIssues() {
        List<Issue> issues = issueRepository.findAll();
        for (Issue issue : issues) {
            IssueDto tmp = new IssueDto();
            tmp.setIssueId(issue.getIssueId());
            tmp.setName(issue.getName());
            tmp.setType(issue.typeByteToBoolean());
            tmp.setCountry(issue.getCountry());
            tmp.setYear(issue.getYear());
            tmp.setDescription(issue.getDescription());
            tmp.setUrl(issue.getUrl());
            setIssueStocks(issue.getIssueId(), tmp.getAssetsChanges());
            setPrevIssues(issue.getIssueId(), tmp.getPrevIssues());
            InitialData.ISSUES.put(tmp.getIssueId(), tmp);
        }
    }

    private void setIssueStocks(int issueId, List<IssueStockDto> list) {
        List<IssueStock> issueStocks = issueStockRepository.findIssueStockByIssueId(issueId);

        for (IssueStock issueStock : issueStocks) {
            IssueStockDto tmp = new IssueStockDto();
            tmp.setIssueStockId(issueStock.getIssueStockId());
            tmp.setIssueId(issueStock.getIssue().getIssueId());
            tmp.setName(issueStock.getIssue().getName());
            tmp.setType(issueStock.getIssue().typeByteToBoolean());
            tmp.setAssetType(issueStock.getAssetType());
            tmp.setAssetId(issueStock.getAssetId());
            tmp.setChangeUnit(issueStock.getChangeUnit());
            tmp.setChangeReason(issueStock.getChangeReason());
            list.add(tmp);
        }
    }

    private void setPrevIssues(int issueId, List<PrevIssueDto> list) {
        List<PrevIssue> prevIssues = prevIssueRepository.findPrevIssueByIssueId(issueId);

        for (PrevIssue prevIssue : prevIssues) {
            PrevIssueDto tmp = new PrevIssueDto();
            tmp.setPrevIssueId(prevIssue.getPrevIssueId());
            tmp.setIssueId(prevIssue.getIssue().getIssueId());
            tmp.setForetoken(prevIssue.getForetoken());
            list.add(tmp);
        }
    }

    private void setStockIndustries() {
        List<StockIndustry> stockIndustries = stockIndustryRepository.findAll();
        for (StockIndustry StockIndustry : stockIndustries) {
            StockIndustryDto tmp = new StockIndustryDto();
            tmp.setStockIndustryId(StockIndustry.getStockIndustryId());
            tmp.setIndustry(StockIndustry.getIndustry());
            InitialData.STOCK_INDUSTRIES.add(tmp);
        }
    }

    private void setStocks() {
        List<Stock> stocks = stockRepository.findAllWithStockIndustries();
        for (Stock stock : stocks) {
            StockDto tmp = new StockDto();
            tmp.setStockId(stock.getStockId());
            tmp.setStockIndustryId(stock.getStockIndustry().getStockIndustryId());
            tmp.setIndustry(stock.getStockIndustry().getIndustry());
            tmp.setType(stock.getType());
            tmp.setCompany(stock.getCompany());
            tmp.setInitialValue(stock.getInitialValue());
            InitialData.STOCKS.add(tmp);
        }
    }

    private void setInsuranceTypes() {
        List<InsuranceType> insuranceTypes = insuranceTypeRepository.findAll();
        for (InsuranceType insuranceType : insuranceTypes) {
            InsuranceTypeDto tmp = new InsuranceTypeDto();
            tmp.setInsuranceTypeId(insuranceType.getInsuranceTypeId());
            tmp.setTypeCode(insuranceType.getTypeCode());
            tmp.setTypeName(insuranceType.getTypeName());
            InitialData.INSURANCE_TYPE.add(tmp);
        }
    }
}
