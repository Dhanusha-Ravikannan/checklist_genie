import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Sidebar/Sidebar";
import "./ChecklistHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";


export default function ChecklistHistory() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [checklistHistory, setChecklistHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token is missing. Please log in.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const templatesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const templatesData = templatesResponse.data.templates;

        setTemplates(templatesData);

        const templateIds = templatesData.map((template) => template.id);
        const historyResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/response/getChecklistHistory`,
          { templateIds },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const restructuredHistory = historyResponse.data.map((version) => {
          const responsesByDate = {};

          version.items.forEach((item) => {
            item.responses.forEach((response) => {
              const date = new Date(response.created_at);
              const dateKey = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              if (!responsesByDate[dateKey]) {
                responsesByDate[dateKey] = [];
              }
              responsesByDate[dateKey].push({
                ...response,
                itemName: item.itemDetails.checklist_name,
                timestamp: date.getTime(),
              });
            });
          });

          const sortedResponsesByDate = Object.entries(responsesByDate)
            .map(([date, responses]) => ({
              date,
              responses,
              timestamp: new Date(responses[0].created_at).getTime(),
            }))
            .sort((a, b) => b.timestamp - a.timestamp);

          return {
            ...version,
            responsesByDate: sortedResponsesByDate,
          };
        });

        setChecklistHistory(restructuredHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  const toggleDate = (date) => {
    setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <>
      <Navbar />
      <div className="template-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          templates.map((template) => {
            const templateVersionResponses = checklistHistory.filter(
              (response) => response.checklist_template_id === template.id
            );

            return (
              <div className="template-card" key={template.id}>
                <h3 className="template-heading">{template.template_name}</h3>
                {templateVersionResponses.length === 0 ? (
                  <p>No versions available</p>
                ) : (
                  templateVersionResponses.map((versionResponse) => (
                    <div
                      className="version-container"
                      key={versionResponse.version_id}
                    >
                      <h4 className="version-heading">
                        Version: {versionResponse.version_id}
                      </h4>
                      {versionResponse.responsesByDate.length === 0 ? (
                        <p style={{ marginLeft: "5px" }}>
                          No responses available
                        </p>
                      ) : (
                        versionResponse.responsesByDate.map(
                          ({ date, responses }) => (
                            <div
                              className="date-group"
                              key={date}
                              onClick={() => toggleDate(date)}
                            >
                              <div className="date-heading">
                                <h5>{date}</h5>
                                <FontAwesomeIcon icon={expandedDates[date] ? faAngleUp : faAngleDown} />
                              </div>
                              {expandedDates[date] && (
                                <div className="responses-container">
                                  {responses.length === 0 ? (
                                    <p>No response available</p>
                                  ) : (
                                    <div className="response-grid">
                                      {responses.map((response) => (
                                        <div
                                          className="response-card"
                                          key={response.id}
                                        >
                                          <p className="item-name">
                                            {response.itemName}
                                          </p>
                                          <p className="response-status">
                                            Status: {response.input}
                                          </p>
                                          <p className="response-comments">
                                            Comments: {response.comments}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
